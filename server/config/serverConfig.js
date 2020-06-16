module.exports.dbhost = process.env.DB_HOST === undefined ? '' : process.env.DB_HOST;
module.exports.dbname = process.env.DB_NAME === undefined ? '' : process.env.DB_NAME;
module.exports.dbpassword = process.env.DB_PASSWORD === undefined ? '' : process.env.DB_PASSWORD;
module.exports.dbusername = process.env.DB_USER_NAME === undefined ? '' : process.env.DB_USER_NAME;
module.exports.rediscachepath = process.env.REDIS_CACHE_PATH === undefined ? '' : process.env.REDIS_CACHE_PATH;