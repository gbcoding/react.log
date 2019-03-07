import React, { Component } from 'react';
import './App.css';
import Login from './components/login/Login'

// Main component
class App extends Component {
  render() {
    return (
      <div className="App"> 
       <Login />  
      </div>
    );
  }
}

export default App;
