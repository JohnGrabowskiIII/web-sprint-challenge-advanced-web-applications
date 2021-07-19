import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

import BubblePage from './components/BubblePage'

function App() {

  // RESPONDS WITH 404 NOT FOUND
  const axiosLogout = () => {
    axios.post('http://localhost:5000/api/logout')
      .then(res => {
        console.log(res);
      })
  }

  const logout = () => {
    axiosLogout();
    window.localStorage.removeItem('token');
    window.location.href = '/login'
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link to='/login' >login</Link>
          <Link to='/bubblepage' >Bubble Page</Link>
          <a data-testid="logoutButton" href="#" onClick={logout} >logout</a>
        </header> 

        <Route path="/login" component={Login} />

        <PrivateRoute path='/bubblepage' component={BubblePage} />

      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.