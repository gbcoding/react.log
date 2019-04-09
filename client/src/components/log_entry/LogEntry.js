import React, { Component } from 'react';
import { View } from 'react-native';
import './LogEntry.css';

export class LogEntry extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }


    render(){
        const item = this.props.item;

        return(
            <View style={{ flexDirection: 'row', height: 100}}>
                <div className="item" key={item.log_id}>
                    <div className="firstline">
                        <span> Date: {item.date} Time: {item.time} </span>
                    </div>
                    <div className="secondline">
                        <span>Name: {item.food_consumed} Type: {item.meal_type}</span>
                    </div>
                    <div className="thirdline">
                        Flag: {item.issue_flag} Duration: {item.duration} Severity: {item.severity}
                        </div>
                    <div className="forthline">
                        <span>Note: {item.notes} </span>
                    </div>
                </div>
            </View>
        );
    }
}