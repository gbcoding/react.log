import React, { Component } from "react";
import axios from 'axios';
import "./Reports.css";
import { saveAs } from 'file-saver';

class Reports extends Component{

    state = {
        foodName: "",
        severity: 0,
        flag: 0,
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
        return(
            <div className="reports">
                <h1>Reports</h1>
                    <div className="navy"></div>
                <input type="text" placeholder="Food Name" name="foodName" onChange={this.handleChange} />
                <input type="number" placeholder="Severity" name="severity" onChange={this.handleChange} />
                <input type="number" placeholder="Flag" name="flag" onChange={this.handleChange} />
                <button onClick={this.createAndDownloadPDF}>Download PDF</button>
            </div>
        );
    }
}

export default Reports;