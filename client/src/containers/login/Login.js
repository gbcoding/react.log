import React, { Component } from "react"; 
import { Text, View, StyleSheet } from 'react-native';
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Login.css';


export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
        this.setState({ isLoading: false});

        
        //For Testing
        alert(
            "Email: " + this.state.email + "\nPassword: " + this.state.password 
        );
    }

    // Render view of login form
    render(){
        return(
            <div className='Login'>
                    
                <h1>Login</h1>
                    
                
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" >
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                               onChange={this.handleChange}
                            />
                            </FormGroup>
 
                        <FormGroup controlId="password" >
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                               onChange={this.handleChange}
                            
                            />
                        </FormGroup>
                        <Button
                            block
                            variant="primary"
                            disabled={!this.validateForm()}
                            type="submit"
                        >   
                        Login
                        </Button>                      
                    </form>
               

                          
                    <p>
                         Don't have an account? <Link to='/SignUp'>Sign Up!</Link>
                    </p>               
                     
            </div>
        
        );
    }
}
