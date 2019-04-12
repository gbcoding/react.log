import React, { Component } from "react"; 
import { Redirect } from "react-router-dom";


export default class Landing extends Component{
    render(){
        return(
            <div>
                <h1>Welcome to React.Log!</h1>
                
            </div>
        );

    }
}


/* RBAC Landing
const Landing = () => (
    <AuthConsumer>
      {({ authenticated }) =>
        authenticated ? (
          <Redirect to="/home" />
        ) : (
          <div>
            <h2>Welcome to React.Log.</h2>
            <Logout />
          </div>
        )
      }
    </AuthConsumer>
  );
  
export default Landing;
*/