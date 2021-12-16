import React from 'react'
import server from '../apis/server'

const Login = () => {
    console.log('Login');
    const submitLoginInfo = () => {
        // let email = document.querySelector('.emailInfo').value
        // let pw = document.querySelector('.passwordInfo').value
        // console.log(email, pw)
        let token = localStorage.getItem('token')
        server
        .get(`/login`, {
            headers: {
                'Authorization': token
            }
        })
        .then(res => console.log(res))
        // .then(data => console.log(data))
    }
    return (
        <div>
            HERE IS login PAGE
            <br/>
            <input type="text" name="email" class="emailInfo"/>
            <br/>
            <input type="text" name="password" class="passwordInfo" />
            <br/>
            <input type="submit" onClick={e => submitLoginInfo(e)}/>
        </div>
    )
}

export default Login
