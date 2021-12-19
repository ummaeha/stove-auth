import React from 'react'
import server from '../apis/server'

const isLogin = () => {
    //get요청을 할 때 필요할때 꺼내다 쓰면됨
    let token = localStorage.getItem('token')
    server
    .get(`/token`, {
        headers: {
            'Authorization': token
        }
    })
    .then(res => {
        console.log(res.data);
        return res.data.auth
    })
}

export default isLogin
