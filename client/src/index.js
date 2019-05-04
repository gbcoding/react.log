import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './auth/Auth';


const auth = new Auth();


let state = {};
window.setState = (changes) => {
    state = Object.assign({}, state, changes);

    ReactDOM.render(<App {...state} />, document.getElementById('root'));
}

/*eslint no-restricted-globals: 0*/
let username = auth.getProfile().nickname || "Visitor";
let user_id = auth.getProfile().sub || "0";

username = username.charAt(0).toUpperCase() + username.slice(1);
let uid = user_id.split("|");

let initialState = {
    name: username,
    UID: uid[1],
    location: location.pathname.replace(/^\/?|\/$/g, ""),
    auth
}

window.setState(initialState);

serviceWorker.unregister();
 