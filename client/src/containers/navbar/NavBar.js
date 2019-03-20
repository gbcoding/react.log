import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import {View, Text} from 'react-native';
import { Button, Nav, Navbar, ButtonToolbar, ButtonGroup} from "react-bootstrap";
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import './NavBar.css';
import { NavButton } from '../../components/navbutton/NavButton';

export default class NavBar extends Component{

    //Render view of home page
    render(){

        return(
            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>

                <div className="mainNav">
                    <div className="table">
 
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
                            value="+"
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
                        <Link to='/login'>
                        <Button
                            as="input" 
                            type="button" 
                            value="Logout"
                            variant="light"
                            size="lg"
                        />
                        </Link>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </View>
        );
    }
}

