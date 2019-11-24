import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import HeaderBar from './containers/headerbar/HeaderBar';
import NavBar from './containers/navbar/NavBar';
import MainAuth from './containers/main/MainAuth';
import MainUnauth from './containers/main/MainUnauth';


import Callback from './auth/Callback';


const NotFound = () => (
  <main>
    <h1>Oops, page not found</h1>
  </main>
)


const Header = (props) => (
  <header>
    <HeaderBar {...props}/>

  </header>
)

const Footer = (props) => (
  <footer>
    <NavBar {...props}/>
  </footer>
)


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
    //  serverMessage: "",
      items: [],
      isLoaded: false,
    }
  }

  render() {

    let mainComponent = "";

    switch(this.props.location){
      case "":

        mainComponent = <MainUnauth {...this.props} />;
        break;

      case "callback":
        mainComponent = <Callback />;
        break;
      case "home":
        if(this.props.auth.isAuthenticated()){
          console.log("Autenticated, transferring to <MainAuth />")
          mainComponent = <MainAuth {...this.props} />;
        }
        else{
          console.log("Error Authenticating, transferring to <NotFound />");
          mainComponent = <NotFound />;
        }
        break;
      default:
        if(this.props.auth.isAuthenticated()){
          mainComponent = <MainAuth {...this.props} />;
        }
        else{
          console.log("Failed to find route");
          mainComponent = <NotFound />;
        }
    }


     return (
      <div className="App">
          <BrowserRouter>
              <View style={{ height: '100%', flexDirection: 'column', alignSelf:'stretch'}}>
                <Header {...this.props}/>
                <ScrollView>
                <div className="mainContent">
                   
                    {mainComponent}
                  
                </div>
                </ScrollView> 
                <Footer {...this.props} />  
              </View>             
          </BrowserRouter>
      </div>
    );
  }
}

export default App;

