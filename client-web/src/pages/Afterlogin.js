import React from 'react'
import { Link } from "react-router-dom"
import isLogin from '../utils/isLogin'

const Afterlogin = () => {
    let result = isLogin()
    console.log(result)
    return (
        <div>
            Afterlogin 페이지 입니다.
            <br/>
            <Link to={'/manage'} className="">유저 관리 페이지</Link>
        </div>
    )
}

export default Afterlogin
