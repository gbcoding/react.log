import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Col, Row} from "react-bootstrap";
import "./SignUp.css";

import { Link } from "react-router-dom";
import axios from 'axios';


export default class SignUpPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",    
            email: "",
            password: "",
            confirmPassword: "",
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

        // Call our fetch function below once the component mounts 
        this.axiosGET('/signup')
        .then(response => {
            this.setState({ serverMessage: response.data.serverMessage});
            console.log("Signup component mounted and data recieved");
            console.log(this.state.serverMessage);
        })
        .catch(err => console.log(err));

    }

    //Async Axios get request
    axiosGET = async(serverPath) => {
        try{
            const response = await axios.get(serverPath);
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    //Async Axios post request
    axiosPOST = async(serverPath, formData) => {
        return axios.post(serverPath, formData)
            .then(response => {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    handleChange = event => {
        this.setState({
              [event.target.id]: event.target.value
         });
    }


    validateForm(){
            return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
        this.setState({ isLoading: false});

        if(this.state.password != this.state.confirmPassword){
            alert("Passwords do not match!");
        }
        else{
            //Login and authenticate
            const formData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            };

            //Send form data to express
            this.axiosPOST('/signup', formData)
                .then(function(response){
                    console.log(response.data.serverMessage);
                    alert(response.data.serverMessage);
                    
                    //return response;
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        }
        /*  
        //For Testing
        alert(
             "First Name: " + this.state.firstName + "\nLast Name: " + this.state.lastName + 
            "\nEmail: " + this.state.email + "\nPassword: " + this.state.password + "\nConfirmed Password: " + this.state.confirmPassword 
        );*/



    }


    render() {
        return (
            <div className="SignUp">
                <h1 style={{textAlign: "center"}}>Sign Up</h1>
            
                <form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="firstName">
                        <FormLabel>First Name</FormLabel>
                        <FormControl 
                            autoFocus
                            type="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="lastName">
                        <FormLabel>Last Name</FormLabel>   
                        <FormControl
                            type="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange} 
                        />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl 
                            type="email"  
                            value={this.state.email} 
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            
                        />
                    </FormGroup>

                    <FormGroup controlId="confirmPassword">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            
                        />
                    </FormGroup>

                    <Button 
                        disabled={!this.validateForm()}
                        variant="primary"
                        type="submit"
                    >Sign Up!</Button>
                </form>  


                <div id="login_msg">              
                    <p>
                        Have an account already? <Link to='/login'>Log in</Link>
                    </p>
                
                </div>  
            </div>
        ); 
    }
}