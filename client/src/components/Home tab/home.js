import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import { Button, Nav, Navbar, ButtonToolbar, ButtonGroup} from "react-bootstrap";


export default class home extends Component{

    //Render view of home page
    render(){
        return(
            <div className="home">
                <h1>Welcome to Home tab</h1>
                    <div className="navy">
                        <header role="navbar" class="nav_main">
                            <Navbar bg="dark" variant="dark">
                                <Nav className="NavBar">
                                    <div class="navClass" role="navigation" id="bottom">
                                    <ButtonGroup aria-label="Basic example">
                                        <Nav.Link href="/home" data-rb-event-key="/home" class="nav_links">Home</Nav.Link>
                                        <Nav.Link href="/reports" data-rb-event-key="/reports" class="nav_links">Reports</Nav.Link>
                                        <ButtonToolbar>
                                            <Button varient="primary" size="lg">
                                                <Nav.Link href="/new_log" data-rb-event-key="/new_log" class="nav_links">+</Nav.Link>
                                            </Button>
                                        </ButtonToolbar>
                                        <Nav.Link href="/view_logs" data-rb-event-key="/view_logs" class="nav_links">View Logs</Nav.Link>
                                        <Nav.Link href="/" data-rb-event-key="logout" class="nav_links">Logout</Nav.Link>
                                    </ButtonGroup>
                                    </div>
                                </Nav>
                            </Navbar>
                        </header>
                    </div>

            </div>
        );
    }
}