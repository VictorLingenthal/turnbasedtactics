
import { RedisPubSub } from 'graphql-redis-subscriptions'
const Redis = require('ioredis')

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const options = {
  retryStrategy: times => Math.min(times * 50, 2000)
};

export const pubSub = new RedisPubSub({
  publisher: new Redis(REDIS_URL, options),
  subscriber: new Redis(REDIS_URL, options),
})
