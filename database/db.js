const Pool = require('pg').Pool;
const keys = require('../config/keys');

const pool = new Pool({
    user: keys.dbUser,
    password: keys.dbPwd,
    host: keys.dbHost,
    port: keys.dbPort,
    database: keys.dbName
    });

module.exports = pool
