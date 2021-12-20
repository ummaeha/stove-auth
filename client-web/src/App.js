import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
// import server from "./apis/server"
<<<<<<< HEAD
import PrivateRoute from './PrivateRoute';
=======
>>>>>>> 913f11d2361267d37dea6f33962d02348e52f147
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
