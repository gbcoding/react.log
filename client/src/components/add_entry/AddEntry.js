import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Row, Col } from 'reactstrap';
import { Form, FormGroup, FormControl } from "react-bootstrap";
import './WebViewAddEntry.css';




export class AddEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isItemAdding: false,
            temp_item: {
                entry_id: "",
                user_id: "",
                log_id: "",
                date: "",
                time: "",
                meal_type: "",
                food_consumed: "",
                issue_flag: "",
                duration: "",
                severity: "",
                notes: ""   
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        

        this.setState({
            temp_item: {
                  ...this.state.temp_item,
                  [event.target.id]: event.target.value
            }
        });

        

    }
    
    handleSubmit = async event => {
        event.preventDefault();

        
        
            const formData = {
                user_id: this.props.user_id,
                entry_id: this.state.temp_item.entry_id,
                log_id: this.state.temp_item.log_id,
                date: this.state.temp_item.date,
                time: this.state.temp_item.time,
                meal_type: this.state.temp_item.meal_type,
                food_consumed: this.state.temp_item.food_consumed,
                issue_flag: this.state.temp_item.issue_flag,
                duration: this.state.temp_item.duration,
                severity: this.state.temp_item.severity,
                notes: this.state.temp_item.notes
            };

            console.log(formData);
            //Send form data to express
            this.props.addItem(formData);
          
    }

    validateForm(){
        return this.state.temp_item.duration != "" && this.state.temp_item.serverity != "";
    }

    handleAdd = () => {
        const {isItemAdding} = this.state;
        this.setState( { isItemAdding: !isItemAdding } );
    }

    render(){
        let ApplyButton = "";

        ApplyButton = (
            <div className="applyButtons">
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Row>
                                    <Col xs="4">    
                                        <Button className="pull-right" color="success" disabled={!this.validateForm()} onClick={this.handleSubmit} style={{fontSize: "1.2vw", marginRight: "50px", marginBottom: "10px"}}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>                       
                        </View>
           </div>
                    
        );
        
        let ItemDisplay = "";

        if(this.state.isItemAdding){
            ItemDisplay = (
                <div className="item">
                    <Row>
                        <Col xs="1">
                                <Form.Group controlId="issue_flag">
                                    <Form.Control as="select" type="issue_flag" value={this.state.temp_item.issue_flag} onChange={this.handleChange}>
                                        <option>{"Flagged"}</option>
                                        <option>{"Unflagged"}</option>
                                    </Form.Control>
                                </Form.Group>
                            
                        </Col> 
                        
                        <Col className="NameCol" xs="3">
                            <FormGroup controlId="food_consumed">
                                <FormControl 
                                    type="food_consumed" 
                                    placeholder="Enter food name" 
                                    value={this.state.temp_item.food_consumed} 
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        {/*<Col className="DateCol" xs="2">
                            <Text  style={{fontSize: "1.5vw", fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.temp_item.date.substring(0,10)}
                            </Text>
                        </Col>
                        <Col className="TimeCol" xs="2">
                            <Text  style={{fontSize: "1.5vw", fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.temp_item.time}
                            </Text>  
                        </Col>*/}
                        <Col xs="2">
                            <Button className="AddButton" color="primary" onClick={this.handleAdd} block>
                                    {"Cancel"}
                            </Button>
                        </Col>
                    </Row>

                    <div className="detail">
                    <hr />
                        <Row>
                            <Col>
                                <Text style={{fontSize: "1.5vw"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                    {"Type:"} 
                                    <Form.Group controlId="meal_type">
                                
                                        <Form.Control as="select" type="meal_type" value={this.state.temp_item.meal_type} onChange={this.handleChange}>
                                            <option>Select</option>
                                            <option>Breakfast</option>
                                            <option>Lunch</option>
                                            <option>Dinner</option>
                                            <option>Snack</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Text>
                            </Col>
                            <Col>
                                <Text style={{fontSize: "1.5vw"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                    Duration: 
                                    <FormGroup controlId="duration">
                                            <FormControl 
                                                type="duration" 
                                                placeholder="Enter time in (mins) EX: 30" 
                                                value={this.state.temp_item.duration} 
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                </Text>
                            </Col> 
                            <Col>
                                <Text style={{fontSize: "1.5vw"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling>
                                    Severity: 
                                    <FormGroup controlId="severity">
                                                <FormControl style={{width: "90%"}} as="select" type="severity" placeholder="Select" value={this.state.temp_item.severity} onChange={this.handleChange}>
                                                    <option>Select</option>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                </FormControl>
                                        </FormGroup>
                                </Text>
                            </Col> 
                        </Row>
                        <Row>
                            <Col>
                                <Text style={{fontSize: "1.5vw"}} adjustsFontSizeToFit minimumFontScale={.5} allowFontScaling>
                                    Note: 
                                    <FormGroup controlId="notes">
                                    <FormControl
                                        style={{width: "97%"}}  
                                        type="notes"
                                        as="textArea"
                                        placeholder="Add any notes" 
                                        rows="4"
                                        value={this.state.temp_item.notes}
                                        onChange={this.handleChange} 
                                    >
                                    {this.state.temp_item.notes}
                                    </FormControl>
                                    </FormGroup>
                                </Text>
                            </Col>
                        </Row>
                
                    </div>

                    {ApplyButton}
                </div>
              
            );
        }
        else{
            ItemDisplay = (
                <div className="item">
                    {<Row>
                        <Col xs="2">
                            <Button className="AddButton" color="warning" onClick={ this.handleAdd } block>
                                    {"Add"}
                            </Button>
                        </Col>
                    </Row>}

                    
                </div>
            );
        }

        return(
            <View>
                <div>
                    {ItemDisplay}
                </div>
                
                
            </View>
        );
    }
}