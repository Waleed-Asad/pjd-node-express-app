const redis = require( './redisConnection');
const Configs = require( '../../config/serverConfig');

const redisPool = new Map();
const getRedisPool = module.exports.getRedisPool = function (cacheHost) {
    if (redisPool.get(cacheHost)) {
        return redisPool.get(cacheHost);
    }
    redisPool.set(cacheHost, redis(cacheHost, { showFriendlyErrorStack: true }));
    errorEvent(redisPool.get(cacheHost));
    return redisPool.get(cacheHost);
};

function errorEvent(redis) {
    redis.on('error', (error) => {
        console.log('REDIS ERROR ===> ', error);
        redis.disconnect(true);
    });
}

const getJSON = module.exports.getJSON = function (key, cacheHost) {
    const redisConnector = getRedisPool(cacheHost);
    return redisConnector.get(key).then((result) => JSON.parse(result || false));
};

const setJSON = module.exports.setJSON = function (key, data, cacheHost) {
    const redisConnector = getRedisPool(cacheHost);
    data = JSON.stringify(data);
    return redisConnector.set(key, data);
};