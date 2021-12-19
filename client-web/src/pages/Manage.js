import React, { useState, useEffect } from 'react'
import { Link, useHistory,useLocation } from "react-router-dom"
import server from '../apis/server'

const Manage = () => {
    const [userlistData, setUserlistData] = useState([])
    const history = useHistory()

    useEffect(() => {
        loadUser()
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
            {userlistData && userlistData.map((eachUser, i) => {
                return <div key={i}>
                    <span>{`${eachUser.id} 번 유저 :  `}</span>
                    <span>{`${eachUser.email}`}</span>
                    <span>{eachUser.role && ` ( ${eachUser.role} ) `}</span>
                    {/* <button onClick={(e) => {editUserInfo(e, `${i+1}`)}}>수정</button> */}
                    <button onClick={(e) => {deleteUser(e, `${i+1}`)}}>삭제</button>
                </div>
                if(eachUser.role == 'admin') {
                    //현 유저가 admin유저일 경우

                }
                else {
                    //admin유저가 아닐경우 로그인 아이디랑 같은 아이디만 보여줌
                }
            })}
            </section>
        </div>
    )
}

export default Manage
