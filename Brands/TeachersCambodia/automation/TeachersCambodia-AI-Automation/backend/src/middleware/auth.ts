import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
import { CustomError } from './errorHandler';
import { JWTPayload, UserRole } from '../types';
import { getSession } from '../config/redis';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
      session?: any;
    }
  }
}

// JWT Secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here';

// Verify JWT token
export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new CustomError('Invalid token', 401, 'INVALID_TOKEN');
  }
};

// Extract token from request
const extractToken = (req: Request): string | null => {
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  // Check query parameter (for email links, etc.)
  if (req.query.token) {
    return req.query.token as string;
  }

  return null;
};

// Main authentication middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);

    if (!token) {
      throw new CustomError('Access token required', 401, 'TOKEN_REQUIRED');
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new CustomError('Token expired', 401, 'TOKEN_EXPIRED');
    }

    // Get session data from Redis
    const session = await getSession(token);
    if (!session) {
      throw new CustomError('Session expired', 401, 'SESSION_EXPIRED');
    }

    // Attach user and session to request
    req.user = decoded;
    req.session = session;

    logger.info(`User authenticated: ${decoded.email} (${decoded.role})`);
    next();
  } catch (error) {
    next(error);
  }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);

    if (token) {
      const decoded = verifyToken(token);
      
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        // Token expired, but don't fail the request
        logger.warn('Expired token in optional auth');
      } else {
        const session = await getSession(token);
        if (session) {
          req.user = decoded;
          req.session = session;
          logger.info(`Optional auth successful: ${decoded.email}`);
        }
      }
    }

    next();
  } catch (error) {
    // Don't fail the request for optional auth
    logger.warn('Optional auth failed:', error);
    next();
  }
};

// Role-based access control middleware
export const requireRole = (roles: UserRole | UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new CustomError('Authentication required', 401, 'AUTHENTICATION_REQUIRED');
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      throw new CustomError(
        `Access denied. Required roles: ${allowedRoles.join(', ')}`,
        403,
        'INSUFFICIENT_PERMISSIONS'
      );
    }

    logger.info(`Role check passed: ${req.user.email} has role ${userRole}`);
    next();
  };
};

// Admin-only middleware
export const requireAdmin = requireRole(UserRole.ADMIN);

// Teacher-only middleware
export const requireTeacher = requireRole(UserRole.TEACHER);

// School-only middleware
export const requireSchool = requireRole(UserRole.SCHOOL);

// Teacher or School middleware
export const requireTeacherOrSchool = requireRole([UserRole.TEACHER, UserRole.SCHOOL]);

// Admin or School middleware
export const requireAdminOrSchool = requireRole([UserRole.ADMIN, UserRole.SCHOOL]);

// Rate limiting middleware
export const rateLimitMiddleware = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  maxRequests: number = 100
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = `rate_limit:${req.ip}:${req.path}`;
      const { incrementRateLimit } = await import('../config/redis');
      
      const currentCount = await incrementRateLimit(key, windowMs);
      
      if (currentCount > maxRequests) {
        throw new CustomError(
          'Rate limit exceeded. Please try again later.',
          429,
          'RATE_LIMIT_EXCEEDED'
        );
      }

      // Add rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - currentCount));
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + windowMs).toISOString());

      next();
    } catch (error) {
      next(error);
    }
  };
};

// API key authentication middleware (for external integrations)
export const apiKeyAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  
  if (!apiKey) {
    throw new CustomError('API key required', 401, 'API_KEY_REQUIRED');
  }

  // Validate API key (you can implement your own validation logic)
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];
  
  if (!validApiKeys.includes(apiKey as string)) {
    throw new CustomError('Invalid API key', 401, 'INVALID_API_KEY');
  }

  logger.info('API key authentication successful');
  next();
};

// CORS middleware for GoDaddy integration
export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedOrigins = [
    'https://www.teacherscambodia.com',
    'https://teacherscambodia.com',
    'http://localhost:3000',
    'http://localhost:5173',
  ];

  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

// Request logging middleware
export const requestLoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  
  // Log request
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.userId,
    userRole: req.user?.role,
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.userId,
    });
  });

  next();
};

// Security headers middleware
export const securityHeadersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy for GoDaddy integration
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.teacherscambodia.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.teacherscambodia.com;"
  );

  next();
};

// Export all middleware
export {
  authMiddleware,
  optionalAuthMiddleware,
  requireRole,
  requireAdmin,
  requireTeacher,
  requireSchool,
  requireTeacherOrSchool,
  requireAdminOrSchool,
  rateLimitMiddleware,
  apiKeyAuthMiddleware,
  corsMiddleware,
  requestLoggingMiddleware,
  securityHeadersMiddleware,
};

