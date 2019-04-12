import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import axios from 'axios';

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            items: []  
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        //const testvar = this.props.params.sub;
        const current_user_id = this.props.UID;

        this.axiosGET('/home', current_user_id)
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