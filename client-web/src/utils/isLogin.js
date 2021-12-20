import React, { useState, useEffect } from 'react'
import server from '../apis/server'

const IsLogin = () => {
    const [authState, setAuthState] = useState(false)

    //get요청을 할 때 필요할때 꺼내다 쓰면됨
    useEffect(() => {
        let token = localStorage.getItem('token')
        // 만료되지 않은 토큰이 있거나 || 로그인 
        server
        .get(`/token`, {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            console.log(res.data);
            setAuthState(res.data.auth)
        })
    }, [])
    return (
        authState
    )
}

export default IsLogin
