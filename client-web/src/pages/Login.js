import React from 'react'
import { Link , useHistory} from 'react-router-dom';
import server from '../apis/server'

const Login = () => {
    const history = useHistory()
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
        .then(res => {
            if(res.data.login) {
                localStorage.setItem('token', res.data.token)
                history.push("/after")
            }
            // alert(res);
        })


    }
    return (
        <div>
            HERE IS login PAGE
            <br/>
            <input type="text" name="email" className="emailInfo"/>
            <br/>
            <input type="text" name="password" className="passwordInfo" />
            <br/>
            <button type="submit" onClick={e => submitLoginInfo(e)}>로그인</button>
        </div>
    )
}

export default Login
