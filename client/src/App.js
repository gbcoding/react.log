import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import SignUpPage from './components/sign_up/SignUp';
//tabs below in order like wireframe
import testPage from './components/Test Page/test1'; //page to test navbar and routes
import homePage from './components/Home tab/home';
import reportsPage from './components/Reports tab/reports';
import newLogPage from './components/New Log tab/new_log';
import viewLogsPage from './components/View Logs tab/view_logs';
import logoutPage from './components/New Log tab/new_log';

// Main component
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/SignUp' component={SignUpPage}/>
      <Route exact path='/' component={Login}/>


      <Route exact path='/test1' component={testPage}/>
      <Route exact path='/home' component={homePage}/>
      <Route exact path='/reports' component={reportsPage}/>
      <Route exact path='/new_log' component={newLogPage}/>
      <Route exact path='/view_logs' component={viewLogsPage}/>
      <Route exact path='/logout' component={logoutPage}/>     
    </Switch>
  </main>
)

const Header = () => (
  <header style={{textAlign: "left"}}>
    <nav>
      <ul>
        <li><Link to='/test1'>test page for navbar/routes</Link></li>
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
