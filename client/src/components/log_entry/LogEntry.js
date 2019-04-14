import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Row, Col } from 'reactstrap';
import './LogEntry.css';

import flag_true from '../../images/flag_true.png';
import flag_false from '../../images/flag_false.png';

export class LogEntry extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            show: false
        };
    }

    showToggle = () => {
        const { show } = this.state;
        this.setState( { show: !show } );
    }


    render(){
        const item = this.props.item;
    
        return(
            <View style={{ flexDirection: 'row', alignSelf: 'stretch'}}>
                <div className="item" key={item.log_id}>
                    <Row>
                        <Col className="NameCol" xs="3">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {item.food_consumed}
                            </Text>
                        </Col>
                        <Col className="FlagCol" xs="2">
                            <img src={item.issue_flag=="1" ? flag_true : flag_false}/>
                        </Col>
                        <Col className="DateCol" xs="2">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {item.date.substring(0,10)}
                            </Text>
                        </Col>
                        <Col className="TimeCol" xs="2">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {item.time}
                            </Text>  
                        </Col>
                        <Col xs="2">
                            <Button className="detailButton" color="primary" onClick={ this.showToggle } block>
                                {this.state.show ? "Hide Details" : "Show Details"}
                            </Button>
                        </Col>
                    </Row>

                    { this.state.show && <LogDetail item={item} />}
                   
                    
                </div>
            </View>
        );
    }
}

class LogDetail extends Component {
    
    constructor(props) {
        super(props);

    }

    render(){
        const item = this.props.item;

        return(
            
            <div className="detail">
                <hr />
                    <Row>
                        <Col>
                            <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                Type: {item.meal_type}
                            </Text>
                        </Col>
                        <Col>
                            <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                Duration: {item.duration} 
                            </Text>
                        </Col> 
                        <Col>
                            <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling>
                                Severity: {item.severity}
                            </Text>
                        </Col> 
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} allowFontScaling>
                                Note: {item.notes}
                            </Text>
                        </Col>
                    </Row>
            
            </div>
           


            /*
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
                    */
        );
    }
}