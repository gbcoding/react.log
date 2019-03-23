// Import required modules
const express = require('express');
const sql = require('sql');

const db = sql();
const app = express();

// GET request/response function. Pass in data to be sent to client
app.get('/login', (req, res) => {

    // Make a form data object for login credentials
    const form_data = {
        username: username = res.username,
        password: password = res.password,
    };


    // Check database to see if password matches stored salted hash

    
    //if (username and password are found in db) {
    //    handle session send to updated login page

    //}
    //else {
        //Send login rejection notice
    //}

    
});

// Set port to 8000 and listen for clients
const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));