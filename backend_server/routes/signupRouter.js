var express = require('express');
var signupRouter = express.Router();
const bcrypt = require('bcrypt');

const mysql = require('mysql');
// For security reasons, database info is not pushed to the repository
// user must create their own sqlDatabaseOptions.json file and add the information manually
const sqlDbOptions = require("../sqlDatabaseOptions.json");

// Create mysql database connection
const db = mysql.createConnection(sqlDbOptions);

db.connect(function(err){

    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }
  
    console.log('Connected to db as id ' + db.threadId);
});



// Send message to signup
signupRouter.get('/', (req, res, next) =>{ 
    res.send({
        serverMessage: "Connected to signup page of backend"
    });
  
});
  
  // Get signup form data
signupRouter.post('/', (req, res, next) => {
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
  
    // Status message for signup
    var accountFound;
  
    // Signup form data
    var firstName = data.firstName;
    var lastName = data.lastName;
    var email = data.email;
    const password = data.password;
  
    // Query database to see if data exists
    const checkUsersQuery = 'SELECT * FROM users WHERE email_address = \''+ email +'\'';
    db.query(checkUsersQuery, (check_err, check_result) => {
        if (check_err) {
            console.log("Check error:" + check_err);  
        }
  
        // If so, ask user if they forgot their password
        if(check_result.length > 0){
            accountFound = "Account with this email address already exists";
            console.log("Account with this email address already exist");
        }
        else{
            // Otherwise, add new user to the db
            db.query('ALTER TABLE users AUTO_INCREMENT = 1', (incr_err, incr_result) => {
                if (incr_err) {
                    console.log("Increment error:" + incr_err);  
                }
                console.log("Incr result = " + JSON.stringify(incr_result));
            });
        
            // Insert new user into users table
            const signupQuery = 'INSERT INTO users (first_name, last_name, email_address) VALUES (\''+ firstName + '\', \''+ lastName + '\', \'' + email +'\')';
  
            db.query(signupQuery, (signup_err, signup_result) => {
                if (signup_err){
                    console.log("Sign Up Error: " + signup_err);
                }
                const msg = signup_result.affectedRows;
                console.log(msg + " record inserted");
  
                // TO DO: Salt and hash password, add to login_info table
                
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(salt_err, salt) {
                    if(salt_err) console.log("Salt error " + salt_err);
                    bcrypt.hash(password, salt, function(hash_err, hash){
                        if(hash_err) console.log("Hash error " + hash_err);
                        console.log('salt = ' + salt);
                        console.log('password = ' + password);
                        console.log('password hash = ' + hash);
                        
                        db.query('SELECT user_id FROM users WHERE email_address = \'' + email + '\'', (getID_err,getID_res) => {
                            if(getID_err){
                                console.log("getID Error: " + getID_err);
                            }        
                            const storeHashQuery = 'INSERT INTO login_info (user_id, password_salt, password_hash) VALUES (\''+ getID_res[0].user_id + '\', \''+ salt + '\', \'' + hash +'\')';
                            db.query(storeHashQuery, (storehash_err, storehash_res) =>{
                                if(storehash_err){
                                    console.log("Store Hash Error: " + storehash_err);
                                }
                            });
                        });

                    });
                });
                                
            });
            accountFound = "You have registered for React.log!";
            //Then redirect new user to their home page
        }
      
        res.send({serverMessage: accountFound}); //Sends message as text
    });
});

module.exports = signupRouter;