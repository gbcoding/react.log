import React, { Component } from "react";
import { View, ScrollView} from 'react-native';
import axios from 'axios';
import "./Reports.css";
import FileSaver from 'file-saver';
import { Button, FormGroup, Col, Row} from "react-bootstrap";
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

    render(){
        const {isLoaded} = this.state;
        let displayScreen = "";

        if(isLoaded === true){
            displayScreen = (

                <ol>
                    {this.state.items.map(item => {
                        const names = `Time: ${item.time} | Date: ${item.date} | Food name: ${item.food_consumed} 
                        | Type: ${item.meal_type} | Duration (mins): ${item.duration} | Severity(0-9): ${item.severity}
                        | Flagged: ${item.issue_flag} | Notes: ${item.notes}`;
                        
                        return <li classname="testItems"> {names} </li>;
                    })}
                </ol>
            ); 
        }
        else{
            displayScreen = (
                <View style={{ backgroundColor: "#4E4A4A", 
                    flexDirection: "row", 
                    display: "inline-block", 
                    justifyContent: "center",
                    marginTop: "50px",
                    marginLeft: "150px",
                    marginRight: "150px",
                    paddingTop: "15px", 
                    paddingBottom: "15px", 
                    borderRadius: "25px"
                    }}>   
                    <LoadingIcon />
                </View>
            );
        }
        
        return(
            <View>   
                <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
                <div className="view_logs">
                    <View>
                        <h1>Reports</h1>
                    </View>
                        <div className="scroller">
                            <View style={{ flexDirection: 'row', height: '100%'}}>
                                <ScrollView>
                                    <div>
                                        <p>Log preview</p>
                                        {displayScreen}
                                    </div>
                                    
                                </ScrollView>  
                            </View>
                        </div>
                        <p> </p>
                    <View className="pdfBttns">                                                                  
                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col>
                                    <Button className="noFlagBttn" onClick={this.createAndDownloadPDF}>Download Full Report PDF</Button>
                                        
                                    </Col>
                                </FormGroup>
                            </View>
                            <View style={{alignItems: 'center'}}>

                                <FormGroup as={Row}>
                                    <Col>
                                    <Button className="FlagBttn" onClick={this.createAndDownloadPDF2}>Download Flagged Report PDF</Button>
                                        
                                    </Col>
                                </FormGroup>
                            </View>
                    </View>  
                    </div>
                </View>
            </View>
        );
    }
}