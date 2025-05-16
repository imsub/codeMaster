import { injectable } from 'inversify';
import Redis from 'ioredis';

/**
 * Class for managing Redis caching
 */
@injectable()
export class CacheManager {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || '');
  }

  async getCache(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async setCache(key: string, value: string, expiry: number): Promise<void> {
    await this.redis.set(key, value, 'EX', expiry);
  }
  async deleteCache(key: string): Promise<void> {
    await this.redis.del(key);
  }
  async clearCache(): Promise<void> {
    const keys = await this.redis.keys('*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
  }
  async getCacheKeys(pattern: string): Promise<string[]> {
    const keys = await this.redis.keys(pattern);
    return keys;
  }
  async getCacheValue(key: string): Promise<string | null> {
    const value = await this.redis.get(key);
    return value;
  }
  async setCacheValue(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }
  async deleteCacheValue(key: string): Promise<void> {
    await this.redis.del(key);
  }
  async clearAllCache(): Promise<void> {
    const keys = await this.redis.keys('*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
  }
}
