import React, { useState, useEffect } from 'react'
import { Link, useHistory,useLocation } from "react-router-dom"
import server from '../apis/server'

const Manage = () => {
    const [userlistData, setUserlistData] = useState([])
    const [user, setUser] = useState('')
    const [auth, setAuth] = useState() //1 - admin / 0 - general
    const history = useHistory()

    useEffect(() => {
        loadUser()
        checkToken()
    }, [])
    //유저정보 불러오기
    const loadUser = () => {
        server
        .get('/userlist')
        .then(res => res)
        .then(dataObj => {
            console.log(dataObj.data)
            setUserlistData(dataObj.data)
        })
    }
    const checkToken = () => {
        let token = localStorage.getItem('token')

        server
        .get(`/token`, {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            // res.data.user
            console.log(res.data);
            setUser(res.data.email)
            setAuth(res.data.user)
            // setAuthState(res.data.auth)
        })
        .catch((err) => console.log(err.response))
    }

    // 회원 정보 수정기능 (by, "수정" 버튼) 
    // const editUserInfo = (e, idx) => {
    //     const data = {

    //     }
    //     server
    //     .put('/userinfo', {id: `${idx}`, newData: {...data}})
    //     .then(res=>console.log(res))
    // }

    // 회원 정보 삭제기능 (by, "삭제" 버튼)
    const deleteUser = (e, userId) => {
        // DOING : 게시글 삭제기능 (개별 포스트에서 시도중)
        server
        .delete(`/user/${userId}`)
        .then(res => res)
        .then(dataObj => {
            loadUser()
            console.log(dataObj)
        })
        // .then(() => history.go(0))
    }
    return (
        <div>
            manage
            <section className='userlistContainer'>
            <div>현재 유저 이름: {`${user}`}</div>
            {userlistData && userlistData.map((eachUser, i) => {
                return <div key={i}>
                    <span>{`${eachUser.id} 번 유저 :  `}</span>
                    <span>{`${eachUser.email}`}</span>
                    <span>{eachUser.role && ` ( ${eachUser.role} ) `}</span>
                    {/* <button onClick={(e) => {editUserInfo(e, `${i+1}`)}}>수정</button> */}
                    {auth == 1 || eachUser.email == user ? <button onClick={(e) => {deleteUser(e, `${eachUser.id}`)}}>삭제</button> : <div />}
                </div>
            })}
            </section>
        </div>
    )
}

export default Manage
