import React, { Component, createContext } from "react";
import { Redirect } from "react-router-dom"

export const UserContext = createContext();

const initialState = {
  uuid: '',
  firstName: '',
  lastName: '',
  organisationUuid: '',
  photoUrl: '',
  preferredName: '',
  public: '',
  status: '',
  token: "",
  isSignUp: false
};

class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  login = userData => {
    console.log('userDatauserDatauserData login =========>', userData)
    this.setState({...userData, isSignUp: true });
  };

  logout = () => {
    this.setState({...initialState });
  }


  render() {
    console.log('userDatauserDatauserData login =========>', this.state);

    return (
      <UserContext.Provider value={{ ...this.state, login: this.login, logout: this.logout }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;