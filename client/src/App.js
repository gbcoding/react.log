import React, { Component } from 'react';
import { View } from 'react-native';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './containers/login/Login';
import SignUp from './containers/sign_up/SignUp';
import Home from './containers/home/Home';
import LogView from './containers/log_view/LogView';
import AddLog from './containers/add_log/AddLog';
import NavBar from './containers/navbar/NavBar';
import Reports from './containers/reports/Reports';

// Main component
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/reports' component={Reports}/>
      <Route exact path='/add_log' component={AddLog}/>
      <Route exact path='/log_view' component={LogView}/>    
    </Switch>
  </main>
)

const Header = () => (
  <header style={{textAlign: "left", paddingLeft: 15}}>
    <h1>React.log</h1>
  </header>
)

const Footer = () => (
  <footer>
    <NavBar />
  </footer>
)


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App"> 
          <View style={{ height: '100%', flexDirection: 'column', alignSelf:'stretch'}}>
            <div className="mainContent">
            
              <Header />
              <Main  />
            
            </div>
            <Footer />
          </View>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

