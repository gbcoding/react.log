import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Home from '../home/Home';
import LogView from '../log_view/LogView';
import AddLog from '../add_log/AddLog';
import Reports from '../reports/Reports';

export default class MainAuth extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
          <main>
            <Switch>
              <Route path='/home' render={(props) => <Home UID={this.props.UID}/>} />
              <Route path='/reports' render={(props) => <Reports name={this.props.name} UID={this.props.UID}/>}/>
              <Route path='/add_log' render={(props) => <AddLog UID={this.props.UID}/>}/>
              <Route path='/log_view' render={(props) => <LogView UID={this.props.UID}/>}  />    
            </Switch>
          </main>

        );
    }
}
