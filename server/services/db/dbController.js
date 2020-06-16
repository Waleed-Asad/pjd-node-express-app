const Config = require('../../config/serverConfig');

const initOptions = {
    query(e) {
        console.log(e.query);
    }
};

const pgp = require('pg-promise')(initOptions);

const options = {
    host:  Config.dbhost,
    database: Config.dbname,
    password: Config.dbpassword,
    user: Config.dbusername,
    port: 5432,
}
const dbConnection = pgp(options);

const getDb = module.exports.getDb = function()
{
    return dbConnection;
}
