import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Row, Col } from 'reactstrap';
import WebLogEntry from "./WebViewLogEntry";
import MobileEntry from "./MobileLogEntry";

export class LogEntry extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            show: false,
            width: window.innerHeight, 
            height: window.innerWidth,
            isItemEditing: false
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    editItemToggle = () => {
        const { isItemEditing } = this.state;
        this.setState( { isItemEditing: !isItemEditing });  
    }

    showToggle = () => {
        const { show } = this.state;
        this.setState( { show: !show } );
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render(){
        let viewRender = "";
        if(this.state.width < 600){
            viewRender = <MobileEntry {...this.props} />
        }
        else{
            viewRender = <WebLogEntry {...this.props}/> 
        }

        return(
            <View>
                <div>
                    {viewRender}
                </div>
            </View>
        );
    }    
}