import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
                <div className="item" key={item.ID}>
                    <div className="firstline">
                        <span> {item.time} {item.date} {item.type} Flag: {item.flag}</span>
                    </div>
                    <div className="secondline">
                        <span>{item.name} </span>
                    </div>

                    <div className="thirdline">
                        <span>Note: {item.detail} </span>
                    </div>
                </div>
            </View>
        );
    }
}