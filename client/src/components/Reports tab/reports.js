import React, { Component } from "react"; 

export default class reports extends Component{

    //Render view of new logs page
    render(){
        return(
            <div className="reports">
                <h1>Welcome to Reports tab</h1>
                    <div className="navy">
                        <header role="navbar" class="nav_main">
                            <div class="navClass" role="navigation" id="bottom">
                                <a href="/home" data-rb-event-key="/home" class="nav_links">Home</a>
                                <a href="/reports" data-rb-event-key="/reports" class="nav_links">Reports</a>
                                <a href="/new_log" data-rb-event-key="/new_log" class="nav_links">New (+) Log</a>
                                <a href="/view_logs" data-rb-event-key="/view_logs" class="nav_links">View Logs</a>
                                <a href="/" data-rb-event-key="logout" class="nav_links">Logout</a>
                            </div>
                        </header>
                    </div>

            </div>
        );
    }
}