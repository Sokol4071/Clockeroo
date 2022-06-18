var mysql = require('mysql');

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'birdhouse_db'
}

module.exports = {
    connection: mysql.createConnection(config)
}