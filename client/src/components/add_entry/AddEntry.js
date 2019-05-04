import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Row, Col } from 'reactstrap';
import { Form, FormGroup, FormControl } from "react-bootstrap";
import './WebViewAddEntry.css';




export class AddEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temp_item: {
                entry_id: "",
                user_id: "",
                log_id: "",
                date: "",
                time: "",
                meal_type: "",
                food_consumed: "",
                issue_flag: "Unflagged",
                duration: "",
                severity: "",
                notes: ""   
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
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

            var issue_flag;
            if(this.state.temp_item.issue_flag==="Flagged")
            {
                issue_flag=1;
            }
            else
            {
                issue_flag=0;
            }

            //Form Checking
            const errors = {};
            var ErrorFound = 0;
            if(this.state.temp_item.food_consumed.length >= 50 ) {
                errors.FoodNameLength = "Food names cannot exceed 50 characters!";
                alert(JSON.stringify(errors.FoodNameLength));
                ErrorFound = 1;
            }
            if(this.state.temp_item.duration.length >= 50) {
                errors.DurationLength = "Duration cannot exceed 50 characters!";
                alert(JSON.stringify(errors.DurationLength));
                ErrorFound = 1;
            }
            if(/[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.state.temp_item.food_consumed)) {
                errors.SpecialCharsInFoodName = "Food names cannot contain special characters!";
                alert(JSON.stringify(errors.SpecialCharsInFoodName));
                ErrorFound = 1;
            }
            if(/[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.state.temp_item.duration)) {
                errors.SpecialCharsInDuration = "Durations cannot contain special characters!";
                alert(JSON.stringify(errors.SpecialCharsInDuration));
                ErrorFound = 1;
            }
            if(this.state.temp_item.duration === "") {
                errors.DurationIsEmpty = "Please provide a duration!";
                alert(JSON.stringify(errors.DurationIsEmpty));
                ErrorFound = 1;
            }
            if(this.state.temp_item.food_consumed === "") {
                errors.FoodNameIsEmpty = "Please provide a food name!";
                alert(JSON.stringify(errors.FoodNameIsEmpty));
                ErrorFound = 1;
            }
            if(this.state.temp_item.meal_type === "") {
                errors.MealTypeIsEmpty = "A meal type must be selected!";
                alert(JSON.stringify(errors.MealTypeIsEmpty));
                ErrorFound = 1;
            }
            if(this.state.temp_item.severity === "") {
                errors.SeverityIsEmpty = "A severity rating must be selected!";
                alert(JSON.stringify(errors.SeverityIsEmpty));
                ErrorFound = 1;
            }
            
            const formData = {
                user_id: this.props.user_id,
                entry_id: this.state.temp_item.entry_id,
                log_id: this.state.temp_item.log_id,
                date: this.state.temp_item.date,
                time: this.state.temp_item.time,
                meal_type: this.state.temp_item.meal_type,
                food_consumed: this.state.temp_item.food_consumed,
                issue_flag: issue_flag,
                duration: this.state.temp_item.duration,
                severity: this.state.temp_item.severity,
                notes: this.state.temp_item.notes
            };
            console.log(formData);
            //Send form data to express
            if(ErrorFound != 1) {
                this.props.addItem(formData);
            }

    }

    validateForm(){
        return this.state.temp_item.duration != "" && this.state.temp_item.serverity != "" 
        && this.state.temp_item.food_consumed != "" && this.state.temp_item.meal_type != "" && 
        !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.state.temp_item.food_consumed) && 
        !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.state.temp_item.duration);
    }


    render(){
        let ApplyButton = "";

        ApplyButton = (
            <div className="applyButtons">
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Row>
                                    <Col xs="4">    
                                        <Button className="pull-right" color="success" onClick={this.handleSubmit} style={{fontSize: "1.2vw", marginRight: "50px", marginBottom: "10px"}}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>                       
                        </View>
           </div>
                    
        );
        
        let ItemDisplay = "";

        ItemDisplay = (
           
                <div className="item">
                <View>
                    <Row>
                        <Col className="FlagCol" xs="3">
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

                    </View>
                    </div>      
            );

        

        return(
                <View style={{flexDirection: 'column', width: "100%", alignItems: 'stretch'}}>
                        {ItemDisplay}
                         
                    
                </View>
        );
    }
}