import React from 'react'; 
import { Route, useHistory } from 'react-router-dom'; 

import isLogin from './utils/isLogin' 

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(isLogin())
    const history = useHistory()

     return ( 
        <Route {...rest} render={props => ( 
            isLogin() ? 
            history.push("/after")
            : history.push("/login") )} /> 
        ); 
    }; 

export default PrivateRoute;