import React, { Component } from "react";
import axios from 'axios';
import "./Reports.css";
import { saveAs } from 'file-saver';
import { Button, Form, FormGroup, FormControl, FormCheck, FormLabel, Col, Row} from "react-bootstrap";
import {View} from "react-native";
import { LogEntry } from '../../components/log_entry/LogEntry';
import LoadingIcon from '../../components/LoadingIcon';


export default class Reports extends Component{

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount(){

        const current_uid = this.props.UID;
 
        this.axiosGET('/reports', current_uid)
            .then(response => this.setState({ error: null, isLoaded: true, items: response.data.data}))
            .catch(err => console.log(err));
        
    }
    
    //Async Axios get request
    axiosGET = async(serverPath, user_id) => {
        try{
            const response = await axios.get(serverPath, {
                params: {
                     user_id: user_id 
                }
            });;
            return response;
        } catch (error) {
            console.log("here");
            console.error(error);
        }
    }

    state = {
        foodName: "",
        severity: 0,
        flag: 0,
        foodNameTest: "",
        userName: "",
    }

    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });
    
    createAndDownloadPDF = () => {
        axios.post('/create-pdf', this.state)
        .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
        .then((res) => { 
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'allLogs.pdf')
        })
    }

    createAndDownloadPDF2 = () => {
        axios.post('/create-pdf2', this.state)
        .then(() => axios.get('/fetch-pdf2', { responseType: 'blob' }))
        .then((res) => { 
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'flaggedLogs.pdf')
        })
    }
    //Render view of reports page
    //<input type="text" name="foodName" id="fname" value="Chicken" onChange={this.handleChange} />
    //<input type="text" placeholder="Food Name" name="asda" onChange={this.handleChange} />
    //<input type="number" placeholder="Severity" name="severity" onChange={this.handleChange} />
    //<input type="number" placeholder="Flag" name="flag" onChange={this.handleChange} />
    //<ul>
    //{this.state.items.map(item => {
    //    const names = `${item.entry_id} ${item.user_id} ${item.log_id} ${item.date}
    //    ${item.time} ${item.meal_type}  ${item.issue_flag}
    //    ${item.duration} ${item.severity} ${item.notes}`;
    //    const foodNames = `${item.food_consumed}`;
    //    return <li classname="testItems"> {names} {foodNames} </li>;
    //})}
    

//</ul>

    render(){
        //const {items} = this.state;
        return(
            <View>   
                <View style={{flexDirection: 'column', alignItems: 'stretch'}}>

                    <View>
                        <h1>Reports</h1>
                    </View>

                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <form onSubmit={this.handleSubmit}>
                        
                            
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
                                    <View style={{flexDirection: 'column'}}>
                                        <FormGroup controlId="userName">
                                            <FormLabel>Food Name</FormLabel>
                                                <FormControl 
                                                    type="text" 
                                                    placeholder="Type your name" 
                                                    name="userName"
                                                    onChange={this.handleChange}
                                                />
                                        </FormGroup>

                                    </View>
                                    
                            </View>
                            
                            
                            
                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col sm={{ span: 9, offset: .75 }}>
                                    <Button onClick={this.createAndDownloadPDF}>Download PDF (all logs)</Button>
                                        
                                    </Col>
                                </FormGroup>
                            </View>
                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col sm={{ span: 10, offset: .75 }}>
                                    <Button onClick={this.createAndDownloadPDF2}>Download PDF (flagged logs)</Button>
                                        
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