var express = require('express');
var reportsRouter = express.Router();


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
reportsRouter.get('/', function(req, res) { 
   
    const user_id = req.query.user_id;

    console.log(user_id)
   const reportsQuery = 'SELECT * FROM food_log WHERE user_id = \''+ user_id +'\''; 
    db.query(reportsQuery, function(err, results) {
      if(err) {
        return res.send(error);
      } else{
            console.log(results);
            return res.json({
              data: results
            });

        } 
    });   
});

module.exports = reportsRouter;