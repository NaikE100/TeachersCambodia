import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which level to log based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define format for logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }),
  
  // File transport for errors
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),
  
  // Daily rotate file transport for all logs
  new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  })
];

// Create the logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

// Create a stream object for Morgan
export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Export logger instance
export { logger };

// Helper functions for specific log types
export const logError = (error: Error, context?: string) => {
  logger.error(`${context ? `[${context}] ` : ''}${error.message}`, {
    stack: error.stack,
    name: error.name
  });
};

export const logInfo = (message: string, data?: any) => {
  logger.info(message, data);
};

export const logWarn = (message: string, data?: any) => {
  logger.warn(message, data);
};

export const logDebug = (message: string, data?: any) => {
  logger.debug(message, data);
};

export const logHttp = (message: string) => {
  logger.http(message);
};

// AI-specific logging
export const logAIRequest = (request: any, response: any, duration: number) => {
  logger.info('AI Request', {
    type: 'ai_request',
    request: {
      model: request.model,
      prompt: request.prompt?.substring(0, 100) + '...',
      tokens: request.max_tokens
    },
    response: {
      tokens: response.usage?.total_tokens,
      model: response.model
    },
    duration: `${duration}ms`
  });
};

export const logAIError = (error: any, request: any) => {
  logger.error('AI Error', {
    type: 'ai_error',
    error: error.message,
    request: {
      model: request.model,
      prompt: request.prompt?.substring(0, 100) + '...'
    }
  });
};

// Job matching specific logging
export const logJobMatch = (teacherId: string, jobId: string, score: number) => {
  logger.info('Job Match', {
    type: 'job_match',
    teacherId,
    jobId,
    score,
    timestamp: new Date().toISOString()
  });
};

// User activity logging
export const logUserActivity = (userId: string, action: string, details?: any) => {
  logger.info('User Activity', {
    type: 'user_activity',
    userId,
    action,
    details,
    timestamp: new Date().toISOString()
  });
};

// Performance logging
export const logPerformance = (operation: string, duration: number, metadata?: any) => {
  logger.info('Performance', {
    type: 'performance',
    operation,
    duration: `${duration}ms`,
    metadata,
    timestamp: new Date().toISOString()
  });
};

