import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './NavBar.css';



const NavButtons = (props) => {

    if(props.auth.isAuthenticated()){
        return(
            <div>
                <div className="button-box">
                    <Link to='/home'>
                    <Button 
                        as="input" 
                        type="button" 
                        value="Home"
                        variant="light" 
                        size={props.size}
                        block
                    /> </Link>
                </div>

                <div className="button-box">
                    <Link to='/log_view'>
                    <Button 
                        as="input" 
                        type="button" 
                        value="View Logs"
                        variant="light" 
                        size={props.size}
                        block
                    /> </Link>
                </div>

                <div className="button-box">
                    <Link to='/add_log'>
                    <Button 
                        as="input" 
                        type="button" 
                        value="New Entry"
                        variant="light"
                        size={props.size}
                        block
                    /></Link>
                </div>

                <div className="button-box">
                    <Link to='/reports'>
                    <Button 
                        as="input" 
                        type="button" 
                        value="Reports"
                        variant="light"
                        size={props.size} 
                        block
                    /> </Link>
                </div>

                <div className="button-box">
                    <Link to>
                    <Button
                        as="input" 
                        type="button" 
                        value="Logout"
                        variant="light"
                        size={props.size}
                        block
                        onClick={props.auth.logout}
                    /></Link>
                </div>     
            </div>
        );
    }
    else{
        return(
            <div className="button-box">
                <Link to>
                <Button
                    as="input" 
                    type="button" 
                    value="Login"
                    variant="light"
                    size="lg"
                    onClick={props.auth.login}
                /></Link>
            </div>

        ); 
    }

};

export default NavButtons;