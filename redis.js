/**
 * redis connection configuration and methods promisify
 * @module redis
 */

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

/**
 * promisify redis hmset method
 */
const hmSetAsync = promisify(redisClient.hmset).bind(redisClient);

/**
 * promisify redis hgetall method
 */
const hmGetAllAsync = promisify(redisClient.hgetall).bind(redisClient);

/**
 * promisify redis hget method
 */
const hmGetAsync = promisify(redisClient.hget).bind(redisClient);

/**
 * promisify redis hdel method
 */
const hDelAsync = promisify(redisClient.hdel).bind(redisClient);

/**
 * promisify redis del method
 */
const delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = {
    redisClient,
    hmSetAsync,
    hmGetAllAsync,
    hmGetAsync,
    hDelAsync,
    delAsync,
};