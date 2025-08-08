import Redis from "ioredis";
import logger from "../common/logger";
import chalk from "chalk";
import { ERROR_MESSAGES } from "../common/errors";
import dotenv from "dotenv";
dotenv.config();

class RedisService {
  private redis: Redis;
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || "redis://redis:6379");
  }

  async checkHealth() {
    try {
      const temp = await this.redis.ping();
      logger.info(`Redis is up: ${temp}`);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async saveProduct(key: string, product: unknown): Promise<string> {
    try {
      return this.redis.set(key, JSON.stringify(product));
    } catch (err) {
      logger.error(`[${chalk.bgRed("REDIS")}]:`, err);
      throw new Error(ERROR_MESSAGES.REDIS_SERVER_ERROR);
    }
  }

  async getProduct(key: string): Promise<string | null> {
    try {
      return this.redis.get(key);
    } catch (err) {
      logger.error(`[${chalk.bgRed("REDIS")}]:`, err);
      throw err;
    }
  }
}

const redisService = new RedisService();
export default redisService;
