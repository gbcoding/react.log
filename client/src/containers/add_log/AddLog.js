/*eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import {View} from "react-native";
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, FormControl, FormCheck, FormLabel, Col, Row} from "react-bootstrap";
import { AddEntry } from '../../components/add_entry/AddEntry';
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
            isLoaded: false,
            redirect: false
            
        };


    }

    componentDidMount(){


    }

 

    addItem = (itemForm) => {
        if(this.props.UID===itemForm.user_id) {
            this.axiosPOST('/add_entry', itemForm)
            .then(function(){
                window.location.assign('http://localhost:3000/log_view');
            })
            .catch(err => console.log(err));
            
        }
        else
        {
            console.log("Cannot Add item.");
        }
        this.setState({redirect: true});
    }

    axiosPOST = async(serverPath, formData) => {
        try{
            const response = await axios.post(serverPath, formData)

            return response;
        } catch (error) {
            console.log("here");
            console.error(error);
        }
    }

    //Render view of new logs page 
    render(){  
        return(
            <div className='add_logs'>

                <h1 className="header1">Add New Log</h1>
            
                <div className="adder">
                    <View style={{ flexDirection: 'row', height: '100%'}}>   
                        
                     
                            <AddEntry user_id={this.props.UID} addItem={this.addItem} />
                            
                            

                        

                    </View>
                </div>
            </div>
                
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