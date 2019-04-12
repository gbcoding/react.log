import React, { Component } from "react";
import Landing from '../landing/Landing';


// Default home page
export default class MainUnauth extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <main>
                <Landing {...this.props}/>
            </main>

        );
    }

}