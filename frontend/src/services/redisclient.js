"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubSub = void 0;
var graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
var Redis = require('ioredis');
var REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
var options = {
    retryStrategy: function (times) { return Math.min(times * 50, 2000); }
};
exports.pubSub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new Redis(REDIS_URL, options),
    subscriber: new Redis(REDIS_URL, options),
});
