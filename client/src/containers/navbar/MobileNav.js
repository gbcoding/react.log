import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import { View } from 'react-native';
import Modal from 'react-responsive-modal';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import NavButtons from './NavButtons';





export default class MobileNav extends Component{
    constructor(props){
        super(props);

        this.state = {
            time: new Date(),
            width: window.innerHeight, 
            height: window.innerWidth, 
            isAuthenticated: this.props.auth.isAuthenticated(),
            show: false
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };

    render(){

        const customOverlay = {
            background: "rgba(190, 135, 80, 0.0)"
        }

        const customModal = {
            background: "#4E4A4A",
            maxWidth: "500px",
            width: "100%",
            position: "absolute",
            bottom: 100,
            right: 1,
            left: 1
          }

        if(this.props.auth.isAuthenticated()){
            const { show } = this.state;
            let btnSize = "md";
            if(this.state.width < 486)
            {
                btnSize = "sm";
            }
            console.log(btnSize);
            return(
                <div className="button-box">
              
                <View>

                    <Button
                        as="input"
                        type="button" 
                        value="Menu"
                        variant="light" 
                        size="lg"
                        onClick={this.showModal}
                            
                        >
                    </Button>

                    <Modal open={show} 
                            onClose={this.hideModal} 
                            center 
                            styles={{overlay: customOverlay, modal: customModal }}
                            showCloseIcon={false}
                            >
                        <NavButtons size={btnSize} {...this.props}/>
                    </Modal>

                </View>

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
                        onClick={this.props.auth.login}
                    /></Link>
                </div>
            );
        }
    }
}