import React, { Component } from "react";
import axios from 'axios';
import "./Reports.css";
import FileSaver from 'file-saver';
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
            items: [],
            foodName: "",
            severity: 0,
            flag: 0,
            userName: this.props.name,
            UID: this.props.UID
        };
    }

    componentDidMount(){
 /*
        const current_uid = this.props.UID;
 
        this.axiosGET('/reports', current_uid)
            .then(response => this.setState({ error: null, isLoaded: true, items: response.data.data}))
            .catch(err => console.log(err));
      */  
    }
    
    //Async Axios get request
    axiosGET = async(serverPath, user_id) => {
        try{
            const response = await axios.get(serverPath, {
                params: {
                     user_id: user_id 
                }
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }


    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });
    
    createAndDownloadPDF = () => {
        console.log(this.state);
        axios.post('/reports/create-pdf-full', this.state)
        .then(() => axios.get('/reports/fetch-pdf-full', { responseType: 'blob' }))
        .then((res) => { 
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            console.log(res.data);
            FileSaver.saveAs(pdfBlob, 'FullReport.pdf')
        })
        .catch(error => {
            console.error(error)
        });
    }

    createAndDownloadPDF2 = () => {
        axios.post('/reports/create-pdf-flagged', this.state)
        .then(() => axios.get('/reports/fetch-pdf-flagged', { responseType: 'blob' }))
        .then((res) => { 
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            FileSaver.saveAs(pdfBlob, 'FlaggedReport.pdf')
        })
        .catch(error => {
            console.error(error)
        });
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

                    <View className="pdfBttns" /*style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}*/>
                        
                                                                                                
                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col>
                                    <Button className="noFlagBttn" onClick={this.createAndDownloadPDF}>Download PDF (all logs)</Button>
                                        
                                    </Col>
                                </FormGroup>
                            </View>
                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col>
                                    <Button className="FlagBttn" onClick={this.createAndDownloadPDF2}>Download PDF (flagged logs)</Button>
                                        
                                    </Col>
                                </FormGroup>
                            </View>
                        
                        
                    </View>  
                </View>
            </View>

            
        );
    }
}