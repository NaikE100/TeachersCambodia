import Redis from 'ioredis';
import { logger } from '../utils/logger';

// Redis client configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
  retryDelayOnClusterDown: 300,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  maxLoadingTimeout: 10000,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
  retryDelayOnClusterDown: 300,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  maxLoadingTimeout: 10000,
};

// Create Redis client
const redis = new Redis(redisConfig);

// Redis connection event handlers
redis.on('connect', () => {
  logger.info('✅ Redis client connected');
});

redis.on('ready', () => {
  logger.info('✅ Redis client ready');
});

redis.on('error', (error) => {
  logger.error('❌ Redis client error:', error);
});

redis.on('close', () => {
  logger.warn('⚠️ Redis client connection closed');
});

redis.on('reconnecting', () => {
  logger.info('🔄 Redis client reconnecting...');
});

// Redis connection function
export const connectRedis = async (): Promise<void> => {
  try {
    await redis.ping();
    logger.info('✅ Redis connected successfully');
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

// Redis disconnection function
export const disconnectRedis = async (): Promise<void> => {
  try {
    await redis.quit();
    logger.info('✅ Redis disconnected successfully');
  } catch (error) {
    logger.error('❌ Redis disconnection failed:', error);
    throw error;
  }
};

// Health check function
export const checkRedisHealth = async (): Promise<boolean> => {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    logger.error('Redis health check failed:', error);
    return false;
  }
};

// Cache helper functions
export const setCache = async (key: string, value: any, ttl?: number): Promise<void> => {
  try {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, serializedValue);
    } else {
      await redis.set(key, serializedValue);
    }
  } catch (error) {
    logger.error('Failed to set cache:', error);
    throw error;
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await redis.get(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  } catch (error) {
    logger.error('Failed to get cache:', error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch (error) {
    logger.error('Failed to delete cache:', error);
    throw error;
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    await redis.flushdb();
    logger.info('Cache cleared successfully');
  } catch (error) {
    logger.error('Failed to clear cache:', error);
    throw error;
  }
};

// Session management functions
export const setSession = async (sessionId: string, data: any, ttl: number = 3600): Promise<void> => {
  await setCache(`session:${sessionId}`, data, ttl);
};

export const getSession = async (sessionId: string): Promise<any | null> => {
  return await getCache(`session:${sessionId}`);
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  await deleteCache(`session:${sessionId}`);
};

// Rate limiting functions
export const incrementRateLimit = async (key: string, ttl: number): Promise<number> => {
  try {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, ttl);
    }
    return count;
  } catch (error) {
    logger.error('Failed to increment rate limit:', error);
    throw error;
  }
};

export const getRateLimit = async (key: string): Promise<number> => {
  try {
    const count = await redis.get(key);
    return count ? parseInt(count) : 0;
  } catch (error) {
    logger.error('Failed to get rate limit:', error);
    return 0;
  }
};

// AI response caching
export const cacheAIResponse = async (prompt: string, response: any, ttl: number = 3600): Promise<void> => {
  const key = `ai:${Buffer.from(prompt).toString('base64')}`;
  await setCache(key, response, ttl);
};

export const getCachedAIResponse = async (prompt: string): Promise<any | null> => {
  const key = `ai:${Buffer.from(prompt).toString('base64')}`;
  return await getCache(key);
};

// Job matching cache
export const cacheJobMatch = async (teacherId: string, jobId: string, score: number, ttl: number = 86400): Promise<void> => {
  const key = `match:${teacherId}:${jobId}`;
  await setCache(key, { score, timestamp: Date.now() }, ttl);
};

export const getCachedJobMatch = async (teacherId: string, jobId: string): Promise<any | null> => {
  const key = `match:${teacherId}:${jobId}`;
  return await getCache(key);
};

// Export Redis client
export { redis };

// Graceful shutdown
process.on('beforeExit', async () => {
  await disconnectRedis();
});

process.on('SIGINT', async () => {
  await disconnectRedis();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectRedis();
  process.exit(0);
});

