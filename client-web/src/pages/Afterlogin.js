import React from 'react'
import isLogin from '../utils/isLogin'

const Afterlogin = () => {
    let result = isLogin()
    console.log(result)
    return (
        <div>
            Afterlogin 페이지 입니다.
        </div>
    )
}

export default Afterlogin
