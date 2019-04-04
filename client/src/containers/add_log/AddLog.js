import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl, FormLabel, Col, Row} from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "./AddLog.css";

export default class AddLog extends Component{

    state = {
        date: new Date(),
    } 

    onChange = date => this.setState({ date })

    //Render view of new logs page 
    render(){  
        return( 
            <div className="new_log">
                <h1>Add New Log</h1>
                <h2>Input date/time</h2>
                    <div className="navy">
                    <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        //dateFormat="MM/d/YYYY h:mm aa"
                    />
                    <Form>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Food Name</Form.Label>
                                <Form.Control type="foodName" placeholder="Enter food name" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="textArea">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="notes" rows="3" />
                        </Form.Group>

                        <Form.Group controlId="selection">
                            <Form.Label>Severity scale (1-9)</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </Form.Control>
                        </Form.Group>

                        <fieldset>
                            <Form.Group as={Col}>
                                <Form.Label as="legend" column sm={2}>
                                Flag this log?
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="YES"
                                        name="YESradio"
                                        id="YESradio1"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="NO"
                                        name="NOradio"
                                        id="NOradio1"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>

                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Submit log</Button>
                            </Col>
                        </Form.Group>

                    </Form>
                </div>
            </div>
        );
    }
}