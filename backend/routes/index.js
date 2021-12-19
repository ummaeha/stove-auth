require("../config/env.js")
const express = require('express');
const app = express();
const cors = require("cors");
const db = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.BACK_PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_ACCESS_SECRET;

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
// connectiog test
// app.get('/', (req, res) => {
//     console.log("GET /posts")
//     const sql = 'SELECT * FROM users'
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         else res.send(result);
//     })
// })
const users =[];
//users.js
//회원가입
app.post('/signup', async (req, res) => {
    console.log("POST /signup")
    console.log(req.body);
    const { email, password } = req.body;
    console.log(req.body);
    const user = users.find(usr => usr.email === email);
    const sql = 'INSERT INTO users SET ?';

    if(!user) {
        const hashed = await bcrypt.hash(password, 10)

        const newUser = {
            email, password:hashed // email에는 email값이 바로 들어가니까 value를 생략, password는 hashed된 값을 저장(TO DO: 사실은 password보다 token이 맞지 않을까?)
        }

        users.push(newUser);
        
        //저장된 회원정보를 JWT를 통해 Token생성
        const newUserToken = jwt.sign({email}, JWT_SECRET_KEY,{
            expiresIn: '60m'
        });
        console.log(newUserToken)
        console.log(users);

        //DB에 insert해야지
        //TO DO: password 타입 고민해봐야즤,
        // db.query(sql, newUser, (err, result) => {
        //     if(err) throw err;
        //     else res.send('데이터베이스에 유저 정보를 등록했습니다')
        // })

        //JSON응답을 통해 메시지와 JWT를 통해 생성한 토큰 전달
        return res.status(200).json({
            msg: "회원가입에 성공하셨습니다!",
            token: newUserToken
        })
    }
    else { //이미 가입된 email일 때,
        return res.status(400).json({msg: '이미 같은 이메일이 존재합니다.'})
    }
})
//회원 인증
app.get('/token', (req, res) => {
    console.log("GET /token")

    // 클라이언트 요청시 헤더값에 포함된 토큰값 분석
    let auth = req.get('Authorization');
    // const userToken = auth.split('.')[1] //? 왜 짤랐을까
    // console.log(userToken); // payload만 검증하면 되니까

    //토큰을 통한 회원 인증
    jwt.verify(auth, JWT_SECRET_KEY, (err, encode) => {
        if(err) console.log(err);
        else {
            console.log(encode)
            res.json({ auth: true })
        }
    })
})
// 로그인
app.post('/login', async(req, res) => {
    console.log("POST /login")

    console.log(users)
    const { email, password } = req.body;
    const user = users.find(usr => usr.email == email);
    if(!user) {
        return res.status(200).json('아이디가 없습니다.');
    }
    else {
        const isEqualPw = await bcrypt.compare(password, user.password)
        console.log(isEqualPw);
        if(isEqualPw) return res.status(200).json({
            msg: "로그인 성공!",
            login: true
        })
        else return res.status(200).json({
            msg: "로그인 실패: 비밀번호를 확인하세요",
            login: false
        });
    }
})    