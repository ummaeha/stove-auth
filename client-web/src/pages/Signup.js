import React from 'react'
import { Link , useHistory} from 'react-router-dom';
import server from '../apis/server'

const Signup = () => {
    const history = useHistory()
    console.log('Signup');
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
                console.log(dataObj.data);
                alert(dataObj.data.msg)
                history.push("/after")
            }
          }
        )//토큰을 Localstorage에 저장하자
        .catch((err) => {
            if(err.response.status === 400) {
                alert(err.response.data.msg)
                history.push("/login")
            }
        })
    }
    return (
        <div>
            HERE IS Signup PAGE
            <br/>
            {/* <input type="text" name="name" className="nameInfo"/> */}
            <br/>
            <input type="text" name="email" className="emailInfo"/>
            <br/>
            <input type="text" name="password" className="passwordInfo" />
            <br/>
            <button type="submit" onClick={e => submitSignupInfo(e)}>회원가입</button>
        </div>
    )
}

export default Signup
