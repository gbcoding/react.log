import React, { Component } from "react"; 
import {Animated, Easing, Image, Text, View } from 'react-native';


export default class LoadingIcon extends Component{

    render(){

        const spinValue = new Animated.Value(0)
        // First set up animation 
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 16000,
                    easing: Easing.linear
                }
            ).start()
    
            // Second interpolate beginning and end values (in this case 0 and 1)
            const spin = spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '2280deg']
            })
    

        return( 
                <div style={{display: "inline-flex"}}>
                    <Animated.Image
                        style={{transform: [{rotate: spin}], flex: 1, width: 150, height: 75 }}
                        source={require('../images/react_log_icon_blur.png')}
                        resizeMode="contain" /> 
                </div>
            
        );
    }
}

