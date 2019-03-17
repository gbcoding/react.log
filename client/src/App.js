import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import SignUpPage from './components/sign_up/SignUp';

// Main component
//test branch commit

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/SignUp' component={SignUpPage}/>
      <Route exact path='/' component={Login}/>
    </Switch>
  </main>
)

const Header = () => (
  <header style={{textAlign: "left"}}>
    <nav>
      <ul>
        <li><Link to='/SignUp'>Sign Up</Link></li>
        <li><Link to='/'>Login</Link></li>
      </ul>
    </nav>
  </header>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App"> 
          <Header />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
