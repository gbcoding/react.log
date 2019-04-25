import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import { Button, Row, Col } from 'reactstrap';
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
            isEditing: false,
            items: []
        };
    }

    getItems = () => {
        this.axiosGET_query('/get_log', this.props.UID)
        .then(response => this.setState({ error: null, isLoaded: true, items: response.data.data}))
        .catch(err => console.log(err));
    }

    axiosGET_query = async(serverPath, user_id) => {
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

    updateItem = (itemForm) => {
        if(this.props.UID==itemForm.user_id) {

            this.setState({ isLoaded: false})

            this.axiosPOST_edit('/update_log', itemForm)
            .then(response => this.setState({ error: null, isLoaded: false, items: null}))
            .catch(err => console.log(err));
        
            this.getItems(this.props.UID);
        }
        else
        {
            console.log("No permission to access this item.");
        }
    }

    axiosPOST_edit = async(serverPath, formData) => {
        return axios.post(serverPath, formData)
            .then(response => {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    deleteItem = (item) => {
        if(this.props.UID==item.user_id)
        {
            this.axiosGET_delete('/delete_log', item.user_id, item.entry_id)
            .then(this.setState({ error: null, isLoaded: false, items: null}))
            .catch(err => console.log(err));

            this.getItems(this.props.UID);
        }
        else
        {
            console.log("No permission to access this item.");
        }

       
    }

    axiosGET_delete = async(serverPath, user_id, entry_id) => {
        try{
            const response = await axios.get(serverPath, {
                params: {
                     user_id: user_id,
                     entry_id: entry_id
                }
            });;
            return response;
        } catch (error) {
            console.log("here");
            console.error(error);
        }
    }

    editToggle = () => {
        const { isEditing } = this.state;
        this.setState( { isEditing: !isEditing } );
    }

    componentDidMount(){

        this.getItems(this.props.UID);
    }
    


    //Render view of view logs page
    render(){
        
        const {items, isEditing, isLoaded} = this.state;

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


        if(isLoaded === true){
            displayScreen = (
                items.map(item => {
                        console.log(item.log_id);
                    return (
                        <LogEntry item={item} isEditing={isEditing} updateItem={this.updateItem} deleteItem={this.deleteItem}/>
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
                <div className="editor">
                    <Button className="editModeButton" color="primary" onClick={ this.editToggle } active={isLoaded} >
                        {this.state.isEditing ? "Exit Editing Mode" : "Edit/Delete Items"}
                    </Button>
                    
                    

                </div>


            </div>
        );   
    }
}
