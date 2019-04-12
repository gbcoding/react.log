import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import {View } from 'react-native';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './NavBar.css';


export default class NavBar extends Component{

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

    //Render navbar
    render(){

        // If user is authenticated
        if(this.props.auth.isAuthenticated()){
            return(
                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>  
                <div className="mainNav">
                    <div className="button-bar">
                        <div className="button-box">
                            <Link to='/home'>
                            <Button 
                                as="input" 
                                type="button" 
                                value="Home"
                                variant="light" 
                                size="lg"
                            /> </Link>
                        </div>
    
                        <div className="button-box">
                            <Link to='/log_view'>
                            <Button 
                                as="input" 
                                type="button" 
                                value="View Logs"
                                variant="light" 
                                size="lg"
                            /> </Link>
                        </div>
    
                        <div className="button-box">
                            <Link to='/add_log'>
                            <Button 
                                as="input" 
                                type="button" 
                                value="New Entry"
                                variant="light"
                                size="lg" 
                            /></Link>
                        </div>
    
                        <div className="button-box">
                            <Link to='/reports'>
                            <Button 
                                as="input" 
                                type="button" 
                                value="Reports"
                                variant="light"
                                size="lg" 
                            /> </Link>
                        </div>
    
                        <div className="button-box">
                            <Link to>
                            <Button
                                as="input" 
                                type="button" 
                                value="Logout"
                                variant="light"
                                size="lg"
                                onClick={this.props.auth.logout}
                            /></Link>
                        </div>

                        <div className="time">
                            <h5>{this.state.time.toLocaleTimeString()}</h5>
                        </div>
                    </div>
                </div>
                </View>
            );
        }
        else{
            return(

                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>  
                <div className="mainNav">
                    <div className="button-bar">
                        <div className="button-box">
                            <Link to>
                            <Button
                                as="input" 
                                type="button" 
                                value="Login"
                                variant="light"
                                size="lg"
                                onClick={this.props.auth.login}
                            /></Link>
                        </div>

                        <div className="time">
                            <h5>{this.state.time.toLocaleTimeString()}</h5>
                        </div>
                    </div>
                </div>
                </View>
            ); 
        }
    }
}