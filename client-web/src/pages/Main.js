import React from 'react'
import { Link, useHistory,useLocation } from "react-router-dom"
import '../reset.css'

const Main = () => {
    console.log('hello');
    return (
        <div>
            <h1>HERE IS MAIN PAGE</h1>
            <br/>
            계정이 있으시다면? 
            <br/>
            <Link to={'/login'} className="">로그인</Link>
            <br/>
            계정이 없으시다면?
            <br/>
            <Link to={'/signup'} className="">회원가입</Link>
        </div>
    )
}

export default Main
