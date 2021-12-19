import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
// import server from "./apis/server"
import PrivateRoute from './PrivateRoute';
import history from "./history";
import Main from './pages/Main'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Afterlogin from './pages/Afterlogin'
import Manage from './pages/Manage';
import './reset.css'
import './App.css';

function App() {

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
                <Route path="/" exact component={Main} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/login" exact component={Login} />
                <Route path="/after" exact component={Afterlogin} />
                <Route path="/manage" exact component={Manage} />

                {/* <Route path="/posts/:postId" exact component={Post} /> */}
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
