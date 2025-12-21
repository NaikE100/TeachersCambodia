import { Request, Response, NextFunction } from 'express';
import { logger, logError } from '../utils/logger';
import { AppError } from '../types';

// Custom error class
export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let code: string | undefined;

  // Handle custom errors
  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code;
  }
  // Handle validation errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
  }
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    code = 'INVALID_TOKEN';
  }
  // Handle JWT expiration
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    code = 'TOKEN_EXPIRED';
  }
  // Handle MongoDB duplicate key errors
  else if (error.name === 'MongoError' && (error as any).code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
    code = 'DUPLICATE_ERROR';
  }
  // Handle Prisma errors
  else if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    switch (prismaError.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Unique constraint violation';
        code = 'UNIQUE_CONSTRAINT_VIOLATION';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Record not found';
        code = 'RECORD_NOT_FOUND';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Foreign key constraint violation';
        code = 'FOREIGN_KEY_VIOLATION';
        break;
      default:
        statusCode = 400;
        message = 'Database error';
        code = 'DATABASE_ERROR';
    }
  }
  // Handle OpenAI errors
  else if (error.message.includes('OpenAI') || error.message.includes('API')) {
    statusCode = 503;
    message = 'AI service temporarily unavailable';
    code = 'AI_SERVICE_ERROR';
  }
  // Handle rate limiting errors
  else if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
    statusCode = 429;
    message = 'Too many requests';
    code = 'RATE_LIMIT_EXCEEDED';
  }
  // Handle file upload errors
  else if (error.message.includes('file') || error.message.includes('upload')) {
    statusCode = 400;
    message = 'File upload error';
    code = 'FILE_UPLOAD_ERROR';
  }

  // Log error with context
  logError(error, `${req.method} ${req.path}`);

  // Log additional error details in development
  if (process.env.NODE_ENV === 'development') {
    logger.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      body: req.body,
      params: req.params,
      query: req.query,
    });
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack,
      }),
    },
    metadata: {
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      requestId: req.headers['x-request-id'] || 'unknown',
    },
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  const error = new CustomError(`Route ${req.originalUrl} not found`, 404, 'ROUTE_NOT_FOUND');
  res.status(404).json({
    success: false,
    error: {
      message: error.message,
      code: error.code,
    },
    metadata: {
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
    },
  });
};

// Validation error handler
export const validationErrorHandler = (errors: any[]) => {
  const errorMessages = errors.map((error: any) => ({
    field: error.path,
    message: error.message,
    value: error.value,
  }));

  return new CustomError('Validation failed', 400, 'VALIDATION_ERROR');
};

// AI-specific error handler
export const handleAIError = (error: any, context: string) => {
  logger.error(`AI Error in ${context}:`, {
    error: error.message,
    type: error.type,
    code: error.code,
    context,
  });

  if (error.type === 'insufficient_quota') {
    return new CustomError('AI service quota exceeded', 503, 'AI_QUOTA_EXCEEDED');
  }

  if (error.type === 'invalid_request_error') {
    return new CustomError('Invalid AI request', 400, 'INVALID_AI_REQUEST');
  }

  if (error.type === 'server_error') {
    return new CustomError('AI service temporarily unavailable', 503, 'AI_SERVICE_UNAVAILABLE');
  }

  return new CustomError('AI processing error', 500, 'AI_PROCESSING_ERROR');
};

// Database error handler
export const handleDatabaseError = (error: any, context: string) => {
  logger.error(`Database Error in ${context}:`, {
    error: error.message,
    code: error.code,
    context,
  });

  if (error.code === 'P2002') {
    return new CustomError('Duplicate entry', 409, 'DUPLICATE_ENTRY');
  }

  if (error.code === 'P2025') {
    return new CustomError('Record not found', 404, 'RECORD_NOT_FOUND');
  }

  return new CustomError('Database error', 500, 'DATABASE_ERROR');
};

// Authentication error handler
export const handleAuthError = (error: any, context: string) => {
  logger.error(`Authentication Error in ${context}:`, {
    error: error.message,
    context,
  });

  if (error.name === 'JsonWebTokenError') {
    return new CustomError('Invalid token', 401, 'INVALID_TOKEN');
  }

  if (error.name === 'TokenExpiredError') {
    return new CustomError('Token expired', 401, 'TOKEN_EXPIRED');
  }

  return new CustomError('Authentication failed', 401, 'AUTHENTICATION_FAILED');
};

// File upload error handler
export const handleFileUploadError = (error: any, context: string) => {
  logger.error(`File Upload Error in ${context}:`, {
    error: error.message,
    context,
  });

  if (error.code === 'LIMIT_FILE_SIZE') {
    return new CustomError('File too large', 400, 'FILE_TOO_LARGE');
  }

  if (error.code === 'LIMIT_FILE_COUNT') {
    return new CustomError('Too many files', 400, 'TOO_MANY_FILES');
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return new CustomError('Unexpected file field', 400, 'UNEXPECTED_FILE_FIELD');
  }

  return new CustomError('File upload failed', 500, 'FILE_UPLOAD_FAILED');
};

// Rate limiting error handler
export const handleRateLimitError = (error: any, context: string) => {
  logger.error(`Rate Limit Error in ${context}:`, {
    error: error.message,
    context,
  });

  return new CustomError('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED');
};

// Export error utilities
export {
  CustomError,
  asyncHandler,
  notFoundHandler,
  validationErrorHandler,
  handleAIError,
  handleDatabaseError,
  handleAuthError,
  handleFileUploadError,
  handleRateLimitError,
};

