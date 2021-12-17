import React from 'react'
import server from '../apis/server'

const Login = () => {
    console.log('Login');
    const submitLoginInfo = () => {
        let email = document.querySelector('.emailInfo').value
        let pw = document.querySelector('.passwordInfo').value
        // console.log(email, pw)
        server
        .post(`/login`, {
            email: `${email}`,
            password: `${pw}`
        })
        .then(res => console.log(res))
        // get요청을 할 때 필요할때 꺼내다 쓰면됨
        // let token = localStorage.getItem('token')
        // server
        // .get(`/login`, {
        //     headers: {
        //         'Authorization': token
        //     }
        // })
        // .then(res => console.log(res))

    }
    return (
        <div>
            HERE IS login PAGE
            <br/>
            <input type="text" name="email" class="emailInfo"/>
            <br/>
            <input type="text" name="password" class="passwordInfo" />
            <br/>
            <button type="submit" onClick={e => submitLoginInfo(e)}>로그인</button>
        </div>
    )
}

export default Login
