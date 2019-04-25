import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './LogEntry.css';

import flag_trueIcon from '../../images/flag_true.png';
import flag_falseIcon from '../../images/flag_false.png';


export class LogEntry extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            show: false,
            isItemEditing: false
        };
    }

    showToggle = () => {
        const { show } = this.state;
        this.setState( { show: !show } );
    }

    
    editItemToggle = () => {
        const { isItemEditing } = this.state;
        this.setState( { isItemEditing: !isItemEditing });  
    }
    


    render(){
        const item = this.props.item;
        const isEditing = this.props.isEditing;


        let EditingButton = "";
        let EntryDisplay = "";

        if(isEditing) {
            
            
            EntryDisplay = (
                <div className="item" key={item.log_id}>
                    <LogEdit item={item} isItemEditing={this.state.isItemEditing} updateItem={this.props.updateItem} deleteItem={this.props.deleteItem} editItemToggle={this.editItemToggle}/>
                </div>
            );
        }
        else {
            EntryDisplay = (
                <div className="item" key={item.log_id}>
                    <Row>
                        <Col className="NameCol" xs="3">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {item.food_consumed}
                            </Text>
                        </Col>
                        <Col className="FlagCol" xs="2">
                            <img src={item.issue_flag=="1" ? flag_trueIcon : flag_falseIcon}/>
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
                        <Col className="EditCol">
                            {EditingButton}
                        </Col>
                    </Row>

                    { this.state.show && <LogDetail item={item} />}

                </div>
            );
        }


        return(
            <View style={{ flexDirection: 'row', alignSelf: 'stretch'}}>
                {EntryDisplay}
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
           


        );
    }
}

class LogEdit extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            item: {
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
            },
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

    handleDelete = () => {
        this.props.deleteItem(this.props.item);
    }

    handleChange = event => {
        this.setState({
              [event.target.id]: event.target.value
         });
    }

    handleSubmit = async event => {
        event.preventDefault();

        var flagBinary = 0;
        if(this.state.temp.issue_flag === "Yes"){
            flagBinary = 1;
        }
            //Login and authenticate
            const formData = {
                user_id: this.state.temp.user_id,
                date: this.state.temp.date,
                time: this.state.temp.time,
                meal_type: this.state.temp.meal_type,
                food_consumed: this.state.temp.food_consumed,
                issue_flag: flagBinary,
                duration: this.state.temp.duration,
                severity: this.state.temp.severity,
                notes: this.state.temp.notes
            };

            console.log(formData);
            //Send form data to express
            this.props.updateItem(formData);
          
    }

    validateForm(){
        return this.state.item.duration != "" && this.state.item.serverity != "";
    }

    componentDidMount (){
        this.setState({item: this.props.item});
    }


    render(){
        let ApplyButton = "";

        ApplyButton = (
         <div className="applyButtons">
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <ButtonGroup>
                                <Button className="pull-right" color="success">
                                    Apply Changes
                                </Button>
                                <Button className="pull-right" color="danger" onClick={this.handleDelete}>
                                    Delete Item
                                </Button>
                            </ButtonGroup>                        
                        </View>
                    </div>
                    
        );
        


        let ItemDisplay = "";

        if(this.props.isItemEditing){
            ItemDisplay = (
                <div>
                    <Row>
                        <Col className="NameCol" xs="3">
                            <FormGroup controlId="food_consumed">
                                <FormControl 
                                    type="food_consumed" 
                                    placeholder="Enter food name" 
                                    value={this.state.item.food_consumed} 
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            


                        </Col>
                        <Col className="FlagCol" xs="2">
                            <img src={this.state.item.issue_flag=="1" ? flag_trueIcon : flag_falseIcon}/>
                        </Col>
                        <Col className="DateCol" xs="2">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.item.date.substring(0,10)}
                            </Text>
                        </Col>
                        <Col className="TimeCol" xs="2">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.item.time}
                            </Text>  
                        </Col>
                        <Col xs="2">
                            <Button className="editButton" color="primary" onClick={ this.props.editItemToggle.bind(this) } block>
                                    {"Cancel"}
                            </Button>
                        </Col>
                    </Row>

                    <div className="detail">
                    <hr />
                        <Row>
                            <Col>
                                <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                    Type: 
                                    <Form.Group controlId="meal_type">
                                
                                        <Form.Control as="select" type="meal_type" value={this.state.meal_type} onChange={this.handleChange}>
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
                                <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                    Duration: 
                                    <FormGroup controlId="duration">
                                            <FormControl 
                                                type="duration" 
                                                placeholder="Enter time in (mins) EX: 30" 
                                                value={this.state.item.duration} 
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                </Text>
                            </Col> 
                            <Col>
                                <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling>
                                    Severity: 
                                    <FormGroup controlId="severity">
                                                <FormControl as="select" type="severity" placeholder="Select" value={this.state.severity} onChange={this.handleChange}>
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
                                <Text style={{fontSize: 20}} adjustsFontSizeToFit minimumFontScale={.5} allowFontScaling>
                                    Note: 
                                    <FormGroup controlId="notes">
                                    <FormControl 
                                        type="notes"
                                        as="textArea"
                                        placeholder="Add any notes" 
                                        rows="4"
                                        value={this.state.notes}
                                        onChange={this.handleChange} 
                                    />
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
                <div>
                    <Row>
                        <Col className="NameCol" xs="3">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.item.food_consumed}
                            </Text>


                        </Col>
                        <Col className="FlagCol" xs="2">
                            <img src={this.state.item.issue_flag=="1" ? flag_trueIcon : flag_falseIcon}/>
                        </Col>
                        <Col className="DateCol" xs="2">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.item.date.substring(0,10)}
                            </Text>
                        </Col>
                        <Col className="TimeCol" xs="2">
                            <Text  style={{fontSize: 20, fontWeight: "bold"}} adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling> 
                                {this.state.item.time}
                            </Text>  
                        </Col>
                        <Col xs="2">
                            <Button className="editButton" color="primary" onClick={ this.props.editItemToggle.bind(this) } block>
                                    {"Edit/Delete"}
                            </Button>
                        </Col>
                    </Row>

                    <LogDetail item={this.state.item} />

                    
                </div>
            );
        }


        return(
            <div>
                {ItemDisplay}
            </div>
            
            
            
           



        );
    }
}