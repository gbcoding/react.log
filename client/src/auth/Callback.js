import React, { Component } from "react"; 
import Auth from "./Auth";


//Old callback component

export default class Callback extends Component{
    componentDidMount(){
        const auth = new Auth();
        auth.handleAuthentication();     
    }

    render(){
        return(
            <div>
                <h1>Callback Page</h1>
                
            </div>
        );

    }
}
