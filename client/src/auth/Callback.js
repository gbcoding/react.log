import React, { Component } from "react"; 
import {View} from 'react-native';
import LoadingIcon from "../components/LoadingIcon"
import Auth from "./Auth";


//Old callback component

export default class Callback extends Component{
    componentDidMount(){
        const auth = new Auth();
        auth.handleAuthentication();     
    }

    render(){
        return(
            <View style={{ backgroundColor: "#4E4A4A", 
            flexDirection: "row", 
            display: "inline-block", 
            justifySelf: "center", 
            justifyContent: "center",
            marginTop: "50px", 
            paddingTop: "15px", 
            paddingBottom: "15px", 
            borderRadius: "25px"
            }}>   
                <LoadingIcon />
            </View>
        );

    }
}

/*
<div style={{display: "inline-flex"}}>
                    <h1 style={{color: "#F8F9FA"}}>Loading...</h1>
                </div>

            */
