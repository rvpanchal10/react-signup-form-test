import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'

import { UserContext } from "./contexts/UserContext";

const ProtectedRoute = ({component: Component, location}) => {
  const userState = useContext(UserContext);

  return userState.isSignUp ? (
    <Component/>
  ) : (
    <Redirect to={{pathname: '/Signup'}}/>
  );

}

export default ProtectedRoute;
