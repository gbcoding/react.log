import React, { Component } from "react";
import { View, ScrollView} from 'react-native';
import './LogView.css';
import { LogEntry } from '../../components/log_entry/LogEntry';
import LoadingIcon from '../../components/LoadingIcon';
import EditIcon from '../../images/edit_icon.png';

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
        console.log("Called get_log");
        this.axiosGET_query('/get_log', this.props.UID)
        .then(response => this.setState({ error: null, isLoaded: true,items: response.data.data}))
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
            console.error(error);
        }
    }

    updateItem = (itemForm) => {
        if(this.props.UID===itemForm.user_id) {
            this.axiosPOST('/update_log', itemForm)
            .catch(err => console.log(err));
        }
        else
        {
            console.log("No permission to access this item.");
        }
    }

    

    axiosPOST = async(serverPath, formData) => {
        try{
            const response = await axios.post(serverPath, formData)


            this.setState({ error: null, isLoaded: false, items: null}, () => {this.getItems(this.props.UID);});

            return response;
        } catch (error) {
            console.log("here");
            console.error(error);
        }
    }


    deleteItem = (item) => {
        if(this.props.UID===item.user_id)
        {
            this.axiosGET_delete('/delete_log', item.user_id, item.entry_id)
            .catch(err => console.log(err));

           
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
            });
            
            this.setState({ error: null, isLoaded: false, items: null}, () => {
                this.getItems(this.props.UID);
            });
            
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
        let displayScreen = "";

        if(isLoaded === true){
            displayScreen = (

                items.map(item => {                       
                    return (
                        <div>
                            <LogEntry key={item.log_id} item={item} isEditing={isEditing} updateItem={this.updateItem} deleteItem={this.deleteItem}/>
                        
                        </div>
                    );     
                })
                
                

            ); 
        }
        else{
            displayScreen = (
                <View style={{ backgroundColor: "#4E4A4A", 
                    flexDirection: "row", 
                    display: "inline-block", 
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

                <div className="editor">
                    <input className="editModeButton" type="image" alt="Click here to Enter/Exit Edit Mode" src={EditIcon} onClick={this.editToggle} active={isLoaded}></input>
                </div>
               
    
                <div className="scroller">
                    <View style={{ flexDirection: 'row', height: '100%'}}>
                        <ScrollView>
                            <div>
                                {displayScreen}
                            </div>
                        </ScrollView>  

                    </View>
                </div>
            </div>
        );   
    }
}


