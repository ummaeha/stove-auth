const mysql = require('mysql2');
<<<<<<< HEAD
require("./env.js")
=======
>>>>>>> 913f11d2361267d37dea6f33962d02348e52f147

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_NAME
});

module.exports = db;