import React, { Component } from "react";
import { Button, Form, Col, Row} from "react-bootstrap";
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
            <div className="FormStyle">
                <h1 style={{textAlign: "center"}}>Sign Up Form</h1>
            
                <Form onSubmit={this.handleSubmit}>

        
                <Form.Group as={Row} controlId="FirstName" bsSiz="large">
                    <Form.Label>First Name </Form.Label>
                    <Form.Control placeholder="First Name" />
                </Form.Group>

                <Form.Group controlId="LastName" bsSize="large">
                    <Form.Label>Last Name </Form.Label>   
                    <Form.Control placeholder="Last Name" />
                </Form.Group>

                <Form.Group controlId="email" bsSize="large">
                    <Form.Label style={{ fontWeight: "bold"}}>Email Address </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="password" bsSize="large">
                    <Form.Label style={{ fontWeight: "bold"}}>Password </Form.Label>
                    <Form.Control
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword" bsSize="large">
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </Form.Group>

                <Button 
                    variant="primary"
                    bsSize="large"
                    type="submit"
                >Sign Up!</Button>
                </Form>  
            </div>
        ); 
    }
}