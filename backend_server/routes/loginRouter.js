var express = require('express');
var loginRouter = express.Router();

const mysql = require('mysql');
// For security reasons, database info is not pushed to the repository
// user must create their own sqlDatabaseOptions.json file and add the information manually
const sqlDbOptions = require("../sqlDatabaseOptions.json");

// Create mysql database connection
const db = mysql.createConnection(sqlDbOptions);

db.connect(function(err){

  if(err){
  //  console.log(err.code);
  //  console.log(err.fatal);
    console.error('Error connecting: ' + err.stack);
    return;
  }
  
  console.log('Connected to db as id ' + db.threadId);
});

loginRouter.use((req, res, next) => {
  console.log("inside loginRouter");
  next();
});


// Send message to login
loginRouter.get('/', (req, res, next) =>{ 

    console.log('In get method');
    res.send({
      serverMessage: "Connected to login page of backend"
    });
  
 });
  
  // Get login form data
loginRouter.post('/', (req, res, next) => {
    const data = req.body;
    try
    {
      console.log("Client sent form data: ");
      console.log(data);
      //console.log(res.password);
    }
    catch(error){
      console.log(error);
    }
  
   // Query database to see if data exists
    var email = data.email;
    const password = data.password;
  
    const loginQuery = 'SELECT * FROM users WHERE email_address = \''+ email +'\'';
  
    db.query(loginQuery, function(err, result) {
  
      if (err) throw err;
  
      console.log(result);
      var accountFound;
      if(result.length > 0){
        accountFound = "Your account was found!";
        console.log("Account Found");
        //redirect to user's home page
      }
      else{
        accountFound = "You don't have an account"; 
        console.log("Account Not Found");
      }
  
      res.send({serverMessage: accountFound}); //Sends message as text
    });
  });


module.exports = loginRouter;
