var express = require('express');
var deletelogRouter = express.Router();

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
  
  console.log('Connected deletelog to db as id ' + db.threadId);
});


// Send message to signup
deletelogRouter.get('/', function(req, res) { 
   
    const user_id = req.query.user_id;
    const entry_id = req.query.entry_id;

    console.log(user_id)
   const deleteQuery = ' DELETE FROM food_log WHERE user_id = ? AND entry_id =  ?'; 
   
    db.query(deleteQuery, [user_id, entry_id], function(err, results) {
      if(err) {
        return res.send(error);
      } else{
            console.log(results);
            return res.send({
              serverMessage: "Item Deleted"
          });

        } 
    });   
});


module.exports = deletelogRouter;