import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import { View } from 'react-native';
import NavButtons from './NavButtons';
import MobileNav from './MobileNav';

import './NavBar.css';


export default class NavBar extends Component{

    constructor(props){
        super(props);

        this.state = {
            time: new Date(),
            width: window.innerHeight, 
            height: window.innerWidth, 
            isAuthenticated: this.props.auth.isAuthenticated()
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    tick() { 
        this.setState({
            time: new Date()
        });
    }



    //Render navbar
    render(){

        let viewRender = "";
        if(this.state.width < 600){
            viewRender = <MobileNav {...this.props} />
        }
        else{
            viewRender = <NavButtons size="lg" {...this.props}/> 
        }


        return (
            <View style={{flexDirection: 'column'}}>  
                <div className="mainNav">
                    <div className="button-bar">                      
                           {viewRender}      
                    </div>   
                </div>

                <div className="time">
                    <h4>{this.state.time.toLocaleTimeString()}</h4>
                </div>
            </View>
        );
    }
} 



