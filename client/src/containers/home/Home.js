import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Button, Nav, Navbar, ButtonToolbar, ButtonGroup} from "react-bootstrap";


export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    //Render view of home page
    render(){
        return(
            <div className="home">
                <h1>Home</h1>
                <h2>Todays date</h2>
                    <div className="navy"></div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        readOnly={true}
                        //placeholderText="This is readOnly" 
                    />
            </div>
        );
    }
}