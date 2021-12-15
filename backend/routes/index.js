require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const db = require('../config/db')
const port = process.env.BACK_PORT || 4000;
// console.log(process.env)

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use(cors());

db.connect((err) => {
    if(err) throw error;
    console.log('Connected with MySQL2');
})

// app.get('/', (req, res) =>{
//     res.send('연결됐는지 테스트하는중')
// })

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})
app.get('/', (req, res) => {
    console.log("GET /posts")
    const sql = 'SELECT * FROM users'
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send(result);
    })
})