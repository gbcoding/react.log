import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    navButtonStyle: {
        padding: 10,
        margin: 5,
        resizeMode: 'stretch',
    }
});


export class NavButton extends Component {
    

    handlePress(){

    }

    render(){
        return(
            <View style = {StyleSheet.container}>
                <TouchableOpacity 
                    style={StyleSheet.navButtonStyle} 
                    onPress={this.handlePress}
                    >
                    <Image source={this.props.source} />
                </TouchableOpacity>
            </View>
        );
    }
}