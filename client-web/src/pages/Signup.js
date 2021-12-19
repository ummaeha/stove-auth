import React from 'react'
import { Link , useHistory} from 'react-router-dom';
import server from '../apis/server'

const Signup = () => {
    const history = useHistory()
    console.log('Login');
    const submitSignupInfo = () => {
        // let name = document.querySelector('.nameInfo').value
        let email = document.querySelector('.emailInfo').value
        let pw = document.querySelector('.passwordInfo').value
        // console.log(email, pw)
        server
        .post(`/signup`, {
            // name: `${name}`,
            email: `${email}`,
            password: `${pw}`
        })
        .then(res => res)
        .then(dataObj => {
            if(dataObj.data) {
                localStorage.setItem('token', dataObj.data.token)
                alert(dataObj.data.msg)
                history.push("/after")
            }
          }
        )//토큰을 Localstorage에 저장하자
        
    }
    return (
        <div>
            HERE IS Signup PAGE
            <br/>
            {/* <input type="text" name="name" class="nameInfo"/> */}
            <br/>
            <input type="text" name="email" class="emailInfo"/>
            <br/>
            <input type="text" name="password" class="passwordInfo" />
            <br/>
            <button type="submit" onClick={e => submitSignupInfo(e)}>회원가입</button>
        </div>
    )
}

export default Signup
