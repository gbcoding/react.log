import React, { Component } from "react";
import { Button, Form, Row, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css";

export default class SignUpPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
        isLoading: false,
        email: "",
        password: "",
        confirmPassword: "",
        FirstName: null,
        LastName: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert(
        "First Name: " + this.state.FirstName + "\nLast Name: " + this.state.LastName + 
        "\nEmail: " + this.state.email + "\nPassword: " + this.state.password + "\nConfirmed Password: " + this.state.confirmPassword 
    );
}

render() {
    return (
        <div className="FormStyle">
            <Form onSubmit={this.handleSubmit}>

                <Card style={{ width: "500px"}}>
                    <Card.Title style={{ fontWeight: "bold", color: "gray", marginTop: "10px"}}>Sign up to track your food allergies/symptoms.</Card.Title>
                
                    <Card.Body style={{ width: "320px", marginLeft: "80px"}}>
                        <Form.Group as={Row} controlId="FirstName" bsSiz="large">
                            <Form.Label column-sm={2}>First Name </Form.Label>
                            <Form.Control placeholder="First Name" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Row} controlId="LastName" bsSize="large">
                            <Form.Label>Last Name</Form.Label>   
                            <Form.Control placeholder="Last Name" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Row} controlId="email" bsSize="large">
                            <Form.Label>Email Address </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Row} controlId="password" bsSize="large">
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder="Password" onChange={this.handleChange} type="password"/>
                        </Form.Group>

                        <Form.Group as={Row} controlId="confirmPassword" bsSize="large">
                            <Form.Label>Confirm Password </Form.Label>
                            <Form.Control placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} type="password"/>
                        </Form.Group>

                        <Button variant="primary" bsSize="large" type="submit">Sign Up</Button>
                    </Card.Body>    
                </Card> 
            </Form>
            <div className="loginCard">
                <Card style={{ width: "500px", height: "50px"}}>
                    <Card.Text style={{ marginTop: "10px"}}>
                        Have an account already? <Link to='/'>Log in</Link>
                    </Card.Text>
                </Card>
            </div>  
        </div>
    );
}
}