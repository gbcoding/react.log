import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import AutoScale from 'react-auto-scale';
import './LogView.css';
import { LogEntry } from '../../components/log_entry/LogEntry';
import LoadingIcon from '../../components/LoadingIcon';

import axios from 'axios';


export default class LogView extends Component{
  
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
 
        this.axiosGET('/logview', current_uid)
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

    //Render view of view logs page
    render(){
        
        const { items } = this.state;

        try{
            const myData = [].concat(items)
                .sort((a, b) => a.log_id < b.log_id)
                .map((item, i) => 
                <div key={i}> {item}</div>
            );
        }
        catch(err){
            console.log(err);
        }



        let displayScreen = "";
        const itemsLoaded = this.state.isLoaded;

        
        if(itemsLoaded === true){
            displayScreen = (
                items.map(item => {
                        console.log(item.log_id);
                    return (
                        <LogEntry item={item} key={item.log_id}/>
                    );     
                })
            ); 
        }
        else{
            displayScreen = (
                <View style={{ backgroundColor: "#4E4A4A", 
                    flexDirection: "row", 
                    display: "inline-block", 
                    justifySelf: "center", 
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
            <div className="view_logs">
                <h1 className="header1">View Logs</h1>
                <hr></hr>
                <div className="scroller">
                    <View style={{ flexDirection: 'row', height: 450}}>
                        <ScrollView>
                            {
                                displayScreen
                            }
                        </ScrollView>  
                       
                    </View>
                </div>
            </div>
        );   
    }
}
