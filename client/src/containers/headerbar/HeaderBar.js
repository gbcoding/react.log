import React, { Component } from 'react';
import { View, Image } from 'react-native';

import './HeaderBar.css';

const HeaderBar = (props) => (

    <View style={{flexDirection: 'column'}} >

        <div className="headerbar">
            <div className="logo">
                <Image source={require('../../images/react_log_logo_outline.png')} style={{flex: 1, width: 200, height: 100 }} resizeMode="contain" />
            </div>
            <div className="profile_info">
                <text style={{fontSize: "2vw"}}> Welcome, {props.name}</text>
                <br></br>
                <text style={{fontSize: "1.2vw"}}> UID: {props.UID}</text>
            </div>
        </div>

    </View>
);

export default HeaderBar;
