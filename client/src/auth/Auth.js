/*eslint no-restricted-globals: 0 */
import React, {Component} from "react";
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';


// For security reasons, authentication config info is not pushed to the repository
// user must create and export their own AUTH_CONFIG object and add the information manually
import {AUTH_CONFIG} from './auth0-variables';


const LOGIN_SUCCESS_PAGE = "/home";
const LOGIN_FAILURE_PAGE = "/";


export default class Auth{
    // Initialize auth0 object
    auth = new auth0.WebAuth(AUTH_CONFIG);

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(){
        this.auth.authorize();
    }

    handleAuthentication = () => {
        this.auth.parseHash((err, authResults) =>{

            if (authResults && authResults.accessToken && authResults.idToken){
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;
            }
            else if (err){
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        });
    }


    isAuthenticated(){
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    
    logout(){
        
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
      
        this.auth.logout( {returnTo: 'http://localhost:3000/'});
        
    }

    getProfile(){
        if(localStorage.getItem("id_token")){
            return jwtDecode(localStorage.getItem("id_token"));
        }
        else{
            return {};
        }
    }
}
