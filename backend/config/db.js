const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '@Yasmin0303',
    database : 'myblog'
    // host : process.env.DB_HOST,
    // user : process.env.DB_USER,
    // password : process.env.DB_PW,
    // database : process.env.DB_NAME

});

module.exports = db;