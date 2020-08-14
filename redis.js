const redis = require('redis');
const { promisify } = require('util');

let redisClient = redis.createClient({
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

const hmSetAsync = promisify(redisClient.hmset).bind(redisClient);
const hmGetAllAsync = promisify(redisClient.hgetall).bind(redisClient);
const hmGetAsync = promisify(redisClient.hget).bind(redisClient);
const hDelAsync = promisify(redisClient.hdel).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = {
    redisClient,
    hmSetAsync,
    hmGetAllAsync,
    hmGetAsync,
    hDelAsync,
    delAsync,
};