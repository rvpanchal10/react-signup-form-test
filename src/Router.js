import React, { useEffect, useContext, useLayoutEffect } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import SignUpPage from './screens/signupPage/SignUpPage'
import NoContentPage from './screens/noContentPage/NoContentPage';
import DashboardPage from './screens/dashboardPage/DashboardPage'

import { getTokenFromLocalStorage, getUserFromLocalStorage } from './utils/localStorage';
import ProtectedRoute from './ProtectedRoute';
import { UserContext } from "./contexts/UserContext";

function AppRouter() {
  const userState = useContext(UserContext);

  useLayoutEffect(() => {
    const token = getTokenFromLocalStorage();
    const loggedUser = getUserFromLocalStorage();

    if(userState.token === null || userState.token === '') {
      if (!loggedUser) {
        userState.logout();
      } else {
        userState.login({ ...loggedUser, token: token });
      }    
    }

  },[userState.token]);

  return (
    <>
      <Switch>
        <Route path="/Signup">
          <SignUpPage />
        </Route>
        <ProtectedRoute exact path="/" component={DashboardPage} />
        <Route path={`/`}>
          <NoContentPage />
        </Route>
      </Switch>
    </>
  )
}

export default AppRouter;
