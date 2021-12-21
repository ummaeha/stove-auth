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
//
const checkAuthority = (email) => {
    const sql = `SELECT ROLE FROM authweb.users where email='${email}'`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) console.log(err);
            else {
                let authority = result;
                console.log(authority[0].ROLE);
                if(authority[0].ROLE == 'admin') resolve(1) // not null
                else resolve(0)
            }
        })
    })
}


const selectQuery = (selectSql, email) => {
    return new Promise((resolve, reject) => {
        db.query(selectSql, (err, result) => {
            if(err) console.log(err);
            else {
                let userlist = result;
                console.log('userlist: ', userlist);
                let user = userlist.find(usr =>{ 
                    console.log('기존 유저: ',usr.email, usr.email === email);
                    return usr.email === email
                });
                console.log('user: ',user);
                resolve (user)
            }
        })
    }
    )

}
//로그인 할 때도, 해당 유저 토큰을 localstorage에 넣어주어야하니까, 토큰 부분을 함수로 분리하자.
const sendToken = (email, sql, newUser) => {
    //저장된 회원정보를 JWT를 통해 Token생성
    const newUserToken = jwt.sign({email}, JWT_SECRET_KEY,{
        expiresIn: '60m'
    });
    console.log('newUserToken',newUserToken)
    // console.log(users);

    //DB에 insert해야지
    //TO DO: password 타입 고민해봐야즤,
    console.log('newUser',newUser);
    newUser&&
    db.query(sql, newUser, (err, result) => {
        if(err) throw err;
        // else res.send('데이터베이스에 유저 정보를 등록했습니다')
    })

    return newUserToken
}
//users.js
//회원가입
app.post('/signup', async (req, res) => {
    console.log("POST /signup")
    console.log(req.body);
    const { email, password } = req.body;
    console.log(req.body);
    //users배열이 아닌 db로 연결하기
    let userlist;
    let user;
    const selectSql = `SELECT * FROM authweb.users`
    user = await selectQuery(selectSql, email)
    
    await console.log(user);
    // const user = userlist.find(usr =>{ 
    //     console.log('기존 유저: ',usr);
    //     usr.email === email
    // });
    const sql = 'INSERT INTO authweb.users SET ?';

    if(!user) {
        const hashed = await bcrypt.hash(password, 10)

        const newUser = {
            email, password:hashed // email에는 email값이 바로 들어가니까 value를 생략, password는 hashed된 값을 저장(TO DO: 사실은 password보다 token이 맞지 않을까?)
        }

        // users.push(newUser);
        
       //sendToken
        const newUserToken = sendToken(email, sql, newUser)
        //JSON응답을 통해 메시지와 JWT를 통해 생성한 토큰 전달
        return res.status(200).json({
            msg: "회원가입에 성공하셨습니다!",
            token: newUserToken
        })
    }
    else { //이미 가입된 email일 때,
        return res.status(400).json({msg: '이미 같은 이메일이 존재합니다. 로그인 페이지로 이동합니다'})
    }
})
//회원 인증
app.get('/token', (req, res) => {
    console.log("GET /token")

    // 클라이언트 요청시 헤더값에 포함된 토큰값 분석
    let auth = req.get('Authorization');
    // const userToken = auth.split('.')[1] //? 왜 짤랐을까
    // console.log(userToken); // payload만 검증하면 되니까
    console.log('auth: ', auth);
    //토큰을 통한 회원 인증
    jwt.verify(auth, JWT_SECRET_KEY, async (err, encode) => {
        if(err) res.send(err);
        else {
            console.log(encode)
            const authority = await checkAuthority(encode.email)
            res.status(200).json({ auth: true, email: encode.email, user: authority })
        }
    })
})
// 로그인
app.post('/login', async(req, res) => {
    console.log("POST /login")

    console.log(users)
    const { email, password } = req.body;
    // const user = users.find(usr => usr.email == email);
    let user;
    const selectSql = `SELECT * FROM authweb.users`
    user = await selectQuery(selectSql, email)
    
    await console.log(user);
    if(!user) {
        return res.status(200).json('아이디가 없습니다.');
    }
    else {
        let newToken = sendToken(email)
        console.log('newToken',newToken);
        const isEqualPw = await bcrypt.compare(password, user.password)
        console.log(isEqualPw);
        if(isEqualPw) return res.status(200).json({
            msg: "로그인 성공!",
            login: true,
            token: newToken
        })
        else return res.status(200).json({
            msg: "로그인 실패: 비밀번호를 확인하세요",
            login: false
        });
    }
})    

//회원 리스트
app.get('/userlist', (req,res) => {
    console.log(`GET /userlist`)
    const sql = `SELECT * FROM authweb.users`
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send(result);
    })
})

// // 회원 정보 수정기능 (by, "수정" 버튼)
// app.put('/userinfo', (req, res) => {
//     const userId = req.body.id;
//     // console.log(req.body.id);
//     console.log(`PATCH /userinfo/${userId}`)

//     const sql = `UPDATE users SET ? WHERE id = ${postId}`
//     db.query(sql, req.body.newData, (err, result) => {
//         if(err) throw err;
//         else res.send(`글을 수정했습니다.`)
//     })
// })

// 회원 정보 삭제기능 (by, "삭제" 버튼)
app.delete('/user/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`DELETE /user/${userId}`);

    const sql = `DELETE FROM authweb.users WHERE id = ${userId}`
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('유저가 삭제되었습니다.')
    })
})
