const redis = require('redis');
const { promisify } = require('util');

const config = {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
}

if(process.env.REDIS_PASSWORD.length > 0){
    config['password'] = process.env.REDIS_PASSWORD;
}

let redisClient = redis.createClient( config );

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