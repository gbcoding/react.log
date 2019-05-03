var express = require('express');
var getlogRouter = express.Router();

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
  
  console.log('Connected getlog to db as id ' + db.threadId);
});


// Send message to signup
getlogRouter.get('/', function(req, res) { 
   
    const user_id = req.query.user_id;

    console.log(user_id)
   const logviewQuery = 'SELECT * FROM food_log WHERE user_id = \''+ user_id +'\' ORDER BY log_id DESC'; 
   //const logviewQuery = 'SELECT * FROM food_log'; 
    db.query(logviewQuery, function(err, results) {
      if(err) {
        return res.send(error);
      } else{
            return res.json({
              data: results
            });

        } 
    });   
});




module.exports = getlogRouter;