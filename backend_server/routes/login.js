var express = require('express');
var router = express.Router();
const path = require('path');

const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan')
const createError = require('http-errors');


router.use(cors());
router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.urlencoded({ extended: false }));







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

// Send message to login
router.get('/login', (req, res, next) =>{ 
    res.send({
      serverMessage: "Connected to backend DB"
    });
  
 });
  
  // Get login form data
router.post('/login', (req, res, next) => {
    const data = req.body;
    try
    {
      //const formData = res.email;
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
        
      }
      else{
        accountFound = "You don't have an account"; 
        console.log("Account Not Found");
      }
  
      res.send({serverMessage: accountFound}); //Sends message as text
    });
  });
  

module.exports = router;
