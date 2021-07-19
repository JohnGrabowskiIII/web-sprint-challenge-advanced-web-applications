import React, { useState } from "react";

import UsernameInput from "./loginForm/UsernameInput";
import PasswordInput from "./loginForm/PasswordInput";
import SubmitButton from "./loginForm/SubmitButton";
import ErrorMessage from "./loginForm/ErrorMessage";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initFormState = {
    username: '',
    password: '',
  }

  const [loginFormState, setLoginFormState] = useState(initFormState)

  const [errorDisplay, setErrorDisplay] = useState(false)

  const changeHandler = (e) => {
    setLoginFormState({...loginFormState,
      [e.target.name]: e.target.value})
  }

  const checkFormState = () => {
    return (
        loginFormState.username === 'Lambda' &&
        loginFormState.password === 'School' ?
        true : false 
    )
  }

  const axiosPostLogin = () => {
    axiosWithAuth().post('http://localhost:5000/api/login', loginFormState)
      .then(res => {
        window.localStorage.setItem('token', res.data.payload)
      })
      .catch(err => {
        alert('error', err)
      })
  }

  const loginSuccess = () => {
    axiosPostLogin();
    setLoginFormState(initFormState)
    setErrorDisplay(false)
    props.history.push('/bubblepage')
  }

  const loginFailure = () => {
    setErrorDisplay(true)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('clicking button')
      checkFormState() ?
        loginSuccess() :
        loginFailure();
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        {/* <h2>Build login form here</h2> */}
        <form onSubmit={submitHandler} >
          <UsernameInput 
            value={loginFormState.username}
            change={changeHandler}
          />
          <PasswordInput 
            value={loginFormState.password}
            change={changeHandler}
          />
          <SubmitButton formState={loginFormState} />
        </form>
      </div>
      {errorDisplay && <ErrorMessage />}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"