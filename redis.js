const redis = require('redis');
const { promisify } = require('util');

let redisClient = redis.createClient({
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

const hmSetAsync = promisify(redisClient.hmset).bind(redisClient);
const hmGetAllAsync = promisify(redisClient.hgetall).bind(redisClient);
const hdelAsync = promisify(redisClient.hdel).bind(redisClient);

module.exports = {
    redisClient,
    hmSetAsync,
    hmGetAllAsync,
    hdelAsync,
};