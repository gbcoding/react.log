// Import required modules
const express = require('express');

const app = express();

// GET request/response function. Pass in data to be sent to client
app.get('/login', (req, res) => {

    // Do data transfer here, customers is just an example object
    const form_data = {
        username: username,
        password: password
    };

    /*
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Steve', lastName: 'Smith'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    // send data as a json object
    res.json(customers);

    */
});

// Set port to 8000 and listen for clients
const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));