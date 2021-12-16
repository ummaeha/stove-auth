import React from 'react'
import server from '../apis/server'

const Signup = () => {
    console.log('Login');
    const submitLoginInfo = () => {
        let email = document.querySelector('.emailInfo').value
        let pw = document.querySelector('.passwordInfo').value
        console.log(email, pw)
        server
        .post(`/signup`, {
            email: `${email}`,
            password: `${pw}`
        })
        .then(res => res)
        // .then(data => console.log(data))
        .then(dataObj => 
            {if(dataObj.data.token) localStorage.setItem('token', dataObj.data.token)}
        )//토큰을 Localstorage에 저장하자
    }
    return (
        <div>
            HERE IS Signin PAGE
            <br/>
            <input type="text" name="email" class="emailInfo"/>
            <br/>
            <input type="text" name="password" class="passwordInfo" />
            <br/>
            <input type="submit" onClick={e => submitLoginInfo(e)}/>
        </div>
    )
}

export default Signup
