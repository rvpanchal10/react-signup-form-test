import React, { useEffect, useContext } from 'react';
import { Dots } from 'react-activity';
import { Redirect } from "react-router-dom";
import { Formik } from 'formik';

import { SignupSchema } from '../../../utils/validation/SignupSchema';
import { signUpQuery } from '../../../api/Queries';
import {config} from '../../../config';
import { UserContext } from "../../../contexts/UserContext";
import { saveUserToLocalStorage, saveTokenToLocalStorage, getTokenFromLocalStorage } from '../../../utils/localStorage';

function SignUpForm(props) {

  const userState = useContext(UserContext);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    if (errorMessage) {
        setTimeout(() => {
            setErrorMessage("");
        }, 2000)
    }
  }, [errorMessage])
  
  let token = getTokenFromLocalStorage();

  const onSubmitSignupHandler = async (creds, resetForm) => {
    try {
      const data = await signUpQuery({ data: {...creds}, campaignUuid: config.campaignUuid});
      if (data && data.data && Object.keys(data.data).length > 0) {
        const userdata = data.data;
        if (userdata && userdata.status === 'ACTIVE') {
          userState.login({ ...userdata, token: data.token });
          saveUserToLocalStorage(userdata);
        }
        saveTokenToLocalStorage(data.token);
      }

      if (data && data.message && Object.keys(data.data).length === 0) {
        setErrorMessage('The fields may not be a blank');
        resetForm();
      }
    } catch (e) {
      console.log(e);
      resetForm();
      setErrorMessage('a network error occured');
    }
  };
  
  if (userState.isSignUp) {
    const page = "/";
    return <Redirect to={page} />;
  }

  if (token) {
      return null;
  }
  
  return (
    <div className="common-page-wrapper">
      <div className="login-form shadow">
        <div className="card-body">
            <div className="card-head text-center">
                <h2>SignUp</h2>
            </div>
            <div className="card-text">
                <Formik
                  initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, { resetForm }) => {
                      onSubmitSignupHandler(values, resetForm);
                  }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                          <form onSubmit={handleSubmit}>
                              <div className={`form-group ${errors.firstName && touched.firstName ? 'has-danger' : ''}`}>
                                  <label htmlFor="inputFirstName">First name</label>
                                  <input
                                      type="text"
                                      name="firstName"
                                      placeholder="First name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.firstName}
                                      id="inputFirstName"
                                      className="form-control form-control-sm" />
                                  <div className="has-error">{errors.firstName && touched.firstName && errors.firstName}</div>
                              </div>
                              <div className={`form-group ${errors.lastName && touched.lastName ? 'has-danger' : ''}`}>
                                  <label htmlFor="inputLastName">Last name</label>
                                  <input
                                      type="text"
                                      name="lastName"
                                      placeholder="Last name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.lastName}
                                      id="inputLastName"
                                      className="form-control form-control-sm" />
                                  <div className="has-error">{errors.lastName && touched.lastName && errors.lastName}</div>
                              </div>
                              <div className={`form-group ${errors.email && touched.email ? 'has-danger' : ''}`}>
                                  <label htmlFor="inputEmailAddress">Email address</label>
                                  <input
                                      type="text"
                                      name="email"
                                      placeholder="Email address"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.email}
                                      id="inputEmailAddress"
                                      aria-describedby="emailHelp"
                                      className="form-control form-control-sm" />
                                  <div className="has-error">{errors.email && touched.email && errors.email}</div>
                              </div>
                              <div className={`form-group ${errors.password && touched.password ? 'has-danger' : ''}`}>
                                  <label htmlFor="inputPassword">Password</label>
                                  <input
                                      type="password"
                                      name="password"
                                      placeholder="Password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password}
                                      className="form-control form-control-sm"
                                      id="inputPassword"
                                  />
                                  <div className="has-error">{errors.password && touched.password && errors.password}</div>
                              </div>
                              <button type="submit" style={{  marginTop: 30, alignItems: "center", display: "flex", justifyContent: 'center' }} disabled={isSubmitting} className="btn btn-primary btn-block">
                                <span style={{marginRight:'20px'}}>Sign up</span>
                                <Dots
                                    color={'#000'}
                                    animating={isSubmitting}
                                  />
                              </button>
                          </form>
                        )}
                </Formik>
                {errorMessage && <div style={{ marginTop: 10 }} className="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;