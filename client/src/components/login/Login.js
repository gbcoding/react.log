import React, { Component } from "react"; 
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";


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

    handleSubmit = event => {
        // package data and send it to the server
        event.preventDefault();
    }

    // Render view of login form
    render(){
        return(
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit ={this.handleSubmit}>
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
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                
            </div>
        
        );
        // To do: Add nav bar to Login page on line 61
    
    }
}
