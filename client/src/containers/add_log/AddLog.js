/*eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import {View} from "react-native";
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, FormControl, FormCheck, FormLabel, Col, Row} from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "./AddLog.css";
import axios from 'axios';
import { DatePicker, TimePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-react-intl'
import '@progress/kendo-react-tooltip'
import '@progress/kendo-react-common'
import '@progress/kendo-react-popup'
import '@progress/kendo-date-math'
import '@progress/kendo-theme-default/dist/all.css';

export default class AddLog extends Component{

    //for time component
    state = {
        time: new Date()
      };
    
      componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          time: new Date()
        });
    }
    //end time component here

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            time: "",
            mealType: "",
            foodName: "",
            flag: "",
            duration: "",
            severity: "",
            notes: "",    
            isLoading: false,
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

        // Call our fetch function below once the component mounts 
        this.axiosGET('/add_log')
        .then(response => {
            this.setState({ serverMessage: response.data.serverMessage});
            console.log("Add log component mounted and data recieved");
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
        return this.state.duration != "" && this.state.serverity != "";
    }


    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
       

        var flagBinary = 0;
        if(this.state.flag === "Yes"){
            flagBinary = 1;
        }
            //Login and authenticate
            const formData = {
                UID: this.props.UID,
                date: this.state.date,
                time: this.state.time,
                mealType: this.state.mealType,
                foodName: this.state.foodName,
                flag: flagBinary,
                duration: this.state.duration,
                severity: this.state.severity,
                notes: this.state.notes
            };

            console.log(formData);
            //Send form data to express
            this.axiosPOST('/add_log', formData)
                .then(function(response){
                    console.log(response.data.serverMessage);
                    window.location.assign('http://localhost:3000/log_view');
                    //return response;
                })
                .catch(function (error) {
                    console.log(error);
                });

            this.setState({redirect: true});
            this.setState({ isLoading: false});
    }

    state = {
        date: new Date(),
    } 

    onChange = date => this.setState({ date })

    //Render view of new logs page 
    render(){  
        return(
            <View>   
                <View style={{flexDirection: 'column', alignItems: 'stretch'}}>

                    <View>
                        <h1>Add New Log</h1>
                    </View>

                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <form onSubmit={this.handleSubmit}>
                        
                            
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
                                    <View style={{flexDirection: 'column'}}>
                                        <FormGroup controlId="foodName">
                                            <FormLabel>Food Name</FormLabel>
                                            <FormControl 
                                                type="foodName" 
                                                placeholder="Enter food name" 
                                                value={this.state.foodName} 
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>

                                        <Form.Group controlId="mealType">
                                        <Form.Label>Type of meal</Form.Label>
                                            <Form.Control as="select" type="mealType" value={this.state.mealType} onChange={this.handleChange}>
                                                <option>Select</option>
                                                <option>Breakfast</option>
                                                <option>Lunch</option>
                                                <option>Dinner</option>
                                                <option>Snack</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </View>
                                    <View>
                                        <FormGroup controlId="duration">
                                            <FormLabel>Reaction Duration</FormLabel>
                                            <FormControl 
                                                type="duration" 
                                                placeholder="Enter time in (mins) EX: 30" 
                                                value={this.state.duration} 
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup controlId="severity">
                                            <FormLabel>Severity?</FormLabel>
                                                <FormControl as="select" type="severity" placeholder="Select" value={this.state.severity} onChange={this.handleChange}>
                                                    <option>Select</option>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                </FormControl>
                                        </FormGroup>

                                    </View>
                            </View>
                            
                            
                            <View> 
                                <FormGroup controlId="notes">
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl 
                                        type="notes"
                                        as="textArea"
                                        placeholder="Add any notes" 
                                        rows="4"
                                        value={this.state.notes}
                                        onChange={this.handleChange} 
                                    />
                                </FormGroup>

                            </View>

                            <View style={{alignItems: 'center'}}>
                            <FormGroup controlId="flag">
                                <FormLabel>Flag this log?</FormLabel>
                                    <FormControl as="select" type="flag" value={this.state.flag} onChange={this.handleChange}>
                                        <option>No</option>
                                        <option>Yes</option>
                                        
                                    </FormControl>
                                </FormGroup>
                            </View>

                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                    
                                        <Button
                                            variant="primary"
                                            disabled={!this.validateForm()}
                                            type="submit"
                                            >Submit Log
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </View>
                        
                        </form>   
                    </View>  
                </View>
            </View>
        );
        
    }
}


// Broken DatePicker code

/*   
                    <h2>Input date/time </h2>
                        <DatePicker
                            onChange={this.onChange}
                            value={this.state.date}
                            //dateFormat="MM/d/YYYY h:mm aa"
                        />
                            <div classname="clock">
                                <TimePicker
                                onChange={this.onChange}
                                value={this.state.time}
                                />
                            </div>
                    */