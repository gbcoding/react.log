
import React, { Component } from "react"; 
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Login.css';

import axios from 'axios';
//const axios = require('axios');


export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            serverMessage: "",
        };
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts 
        this.axiosGET()
            .then(response => {
                this.setState({ serverMessage: response.data.serverMessage});
                console.log("Component mounted and data recieved");
                console.log(this.state.serverMessage);
            })
            .catch(err => console.log(err));
    }

    // Check that data is in the form
    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
        
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //Async Axios get request
    axiosGET = async() => {
        try{
            const response = await axios.get('/login');
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    //Async Axios post request
    axiosPOST = async(serverPath, formData) => {
        axios.post(serverPath, formData)
            .then(function (response) {
                console.log(response.data);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    
    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
        
        //For Testing
        console.log(
            "Email: " + this.state.email + "\nPassword: " + this.state.password 
        );

        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        //Send form data to express
        console.log(formData);

        this.axiosPOST('/login', formData)
            .then(function(response){
                return response;
            })

        this.setState({ isLoading: false});
    };

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
