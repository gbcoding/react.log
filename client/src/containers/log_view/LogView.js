import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import './LogView.css';
import { LogEntry } from '../../components/log_entry/LogEntry';


const items = [
    {
        EID: '1',
        UID: '1',
        LID: '1',
        type: 'dinner',
        name: 'orange',
        flag: "false",
        date: "03/10/2019",
        time: "6:30PM",
        detail: "This is detail for orange."
    },
    {
        EID: '10',
        UID: '1',
        LID: '2',
        type: 'dinner',
        name: 'apple',
        flag: "false",
        date: "03/11/2019",
        time: "8:30PM",
        detail: "Nothing is special about apple."
    },
    {
        EID: '100',
        UID: '1',
        LID: '3',
        type: 'breakfast',
        name: 'egg',
        flag: "true",
        date: "03/21/2019",
        time: "9:30AM",
        detail: "N/A"
    },
    {
        EID: '101',
        UID: '1',
        LID: '4',
        type: 'lunch',
        name: 'ramen',
        flag: "true",
        date: "03/21/2019",
        time: "12:00PM",
        detail: "N/A"
    },
    {
        EID: '102',
        UID: '1',
        LID: '5',
        type: 'dinner',
        name: 'ramen',
        flag: "true",
        date: "03/21/2019",
        time: "7:00PM",
        detail: "N/A"
    },
    {
        EID: '103',
        UID: '1',
        LID: '6',
        type: 'lunch',
        name: 'sandwich',
        flag: "true",
        date: "03/22/2019",
        time: "1:00PM",
        detail: "N/A"
    }

];

localStorage.setItem('items', JSON.stringify(items));

export default class LogView extends Component{
  
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }


    componentWillMount() {

        this.getItems();
    }

    getItems(){
        const items = JSON.parse(localStorage.getItem('items'));

        this.setState({ items });
    }



    //Render view of view logs page
    render(){
        return(
            <div className="view_logs">
                <h1>View Logs</h1>
                <hr></hr>
                <div className="scroller">
                    <View style={{ flexDirection: 'row', height: 450}}>
                        <ScrollView>
                            {
                                this.state.items.map(item => {
                                    return (
                                        <LogEntry item={item}/>
                                    );
                                })
                            }
                        </ScrollView>   
                    </View>
                </div>
            </div>
        );
    }
}
