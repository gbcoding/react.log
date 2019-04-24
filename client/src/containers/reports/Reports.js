import React, { Component } from "react";
import axios from 'axios';
import "./Reports.css";
import { saveAs } from 'file-saver';

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
    }

    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });
    
    createAndDownloadPDF = () => {
        axios.post('/create-pdf', this.state)
        .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
        .then((res) => { 
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'newPDF.pdf')
        })
    }

    //Render view of reports page
    render(){
        //const {items} = this.state;
        return(
            <div className="reports">
                <h1>Reports</h1>
                

                <ul>
                    {this.state.items.map(item => {
                        const names = `${item.entry_id} ${item.user_id} ${item.log_id} ${item.date}
                        ${item.time} ${item.meal_type}  ${item.issue_flag}
                        ${item.duration} ${item.severity} ${item.notes}`;
                        const foodNames = `${item.food_consumed}`;
                        return <li classname="testItems"> {names} {foodNames} </li>;
                    })}
                    

                </ul>
                
                
                <input type="text" placeholder="Food Name" name="foodName" onChange={this.handleChange} />
                <input type="number" placeholder="Severity" name="severity" onChange={this.handleChange} />
                <input type="number" placeholder="Flag" name="flag" onChange={this.handleChange} />
                <button onClick={this.createAndDownloadPDF}>Download PDF</button>

            </div>
            
        );
    }
}