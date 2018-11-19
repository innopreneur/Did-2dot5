import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import RecoverCredentials from './RecoverCredentials';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <>
      <Router>
        <div>
          <Route exact path="/" exact component={Signup} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login/" component={Login} />
          <Route path="/recover/" component={RecoverCredentials} />
        </div>
      </Router>
      </>
    
    );
  }
}

export default App;
