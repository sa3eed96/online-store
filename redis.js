const redis = require('redis');
const { promisify } = require('util');

let redisClient = redis.createClient({
    host: 'redis-13840.c15.us-east-1-4.ec2.cloud.redislabs.com' || process.env.REDIS_ENDPOINT,
    port: '13840' || process.env.REDIS_PORT,
    password: '3sLFj1TLDp13HrBYBOa1bb62fFiU3h7o' || process.env.REDIS_PASSWORD,
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