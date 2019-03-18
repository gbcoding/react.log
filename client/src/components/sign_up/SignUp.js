import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Col, Row} from "react-bootstrap";
import "./SignUp.css";

export default class SignUpPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
        isLoading: false,
        email: "",
        password: "",
        confirmPassword: "",
        newUser: null
        };
    }

    handleChange = event => {
       this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.setState({ newUser: "test"});
        this.setState({ isLoading: false});
    }

    render() {
        return (
            <div className="SignUp">
                <h1 style={{textAlign: "center"}}>Sign Up</h1>
            
                <form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="firstName">
                        <FormLabel>First Name </FormLabel>
                        <FormControl 
                            autofocus
                            type="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="lastName">
                        <FormLabel>Last Name </FormLabel>   
                        <FormControl
                            type="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange} 
                        />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <FormLabel>Email Address </FormLabel>
                        <FormControl 
                            type="email"  
                            value={this.state.email} 
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="password">
                        <FormLabel>Password </FormLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            
                        />
                    </FormGroup>

                    <FormGroup controlId="confirmPassword">
                        <FormLabel>Confirm Password </FormLabel>
                        <FormControl
                            type="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            
                        />
                    </FormGroup>

                    <Button 
                        variant="primary"
                        bsSize="large"
                        type="submit"
                    >Sign Up!</Button>
                </form>  
            </div>
        ); 
    }
}