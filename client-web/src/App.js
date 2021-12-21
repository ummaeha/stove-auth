import React, { useState, useEffect }  from 'react';
import { Router, Switch, Route } from "react-router-dom";
import server from "./apis/server"
import PrivateRoute from './PrivateRoute';
import history from "./history";
import Main from './pages/Main'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Afterlogin from './pages/Afterlogin'
import Manage from './pages/Manage';
import IsLogin from './utils/IsLogin';
import './reset.css'
import './App.css';

function App() {
    const [authState, setAuthState] = useState(false)

    let token = localStorage.getItem('token')
      // 만료되지 않은 토큰이 있거나 || 로그인 
      useEffect(() => {

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

    // useEffect(() => {
    // server
    // .get(`/`)
    // .then(res => res)
    // .then(data => console.log(data))

  // }, [])
  return (
    <div className="App" >
      <Router history={history}>
        <div className="main-container">
          <Switch>
            <div className="main-body">
                <Route path="/" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                {/* <Route path="/login" exact component={Login} /> */}
                <Route path="/after" exact component={Afterlogin} />
                <Route path="/manage" exact component={Manage} />
                <Route path="/islogin" exact component={IsLogin} />
                {/* <Route path="/posts/:postId" exact component={Post} /> */}
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
