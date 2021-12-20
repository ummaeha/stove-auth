import React from 'react'; 
import { Route, useHistory } from 'react-router-dom'; 

import IsLogin from './utils/IsLogin' 

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(IsLogin())
    const history = useHistory()

     return ( 
        <Route {...rest} render={props => ( 
            //true면 그 auth정보를 받아와서 
            IsLogin() ? 
            history.push("/after")
            : history.push("/login") )} /> 
        ); 
    }; 

export default PrivateRoute;