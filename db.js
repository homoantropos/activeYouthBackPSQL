const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: '20200876',
    host: "localhost",
    port: 5432,
    database: "activeyouth"
    });

module.exports = pool
