import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Col, Row} from "react-bootstrap";
import "./SignUp.css";

import { Link } from "react-router-dom";



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
        }
        
        //For Testing
        alert(
             "First Name: " + this.state.firstName + "\nLast Name: " + this.state.lastName + 
            "\nEmail: " + this.state.email + "\nPassword: " + this.state.password + "\nConfirmed Password: " + this.state.confirmPassword 
        );
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