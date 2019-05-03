var express = require('express');
var updatelogRouter = express.Router();

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
  
  console.log('Connected updatelog to db as id ' + db.threadId);
});


// Send message to signup
updatelogRouter.post('/', function(req, res) {
  const data = req.body;
  try
  {
    console.log(data);
  }
  catch(error){
    console.log(error);
  }

  // Add log form data
 
  var user_id = data.user_id;
  console.log("UserID: " + user_id);
  
  var entry_id = data.entry_id;

  var meal_type = data.meal_type;
  var food_consumed = data.food_consumed;
  var issue_flag = data.issue_flag;
  var duration = data.duration;
  var severity = data.severity;
  var notes = data.notes;
  //var date = data.date;
  //var time = data.time;

  
  const updatelogQuery = 'UPDATE food_log SET meal_type = \''+ meal_type + '\', food_consumed = \'' + food_consumed + '\', issue_flag = \'' + issue_flag + '\', duration = \'' + duration +'\', severity = \'' + severity + '\', notes = \'' + notes +'\' WHERE entry_id = \'' + entry_id + '\'';
  db.query(updatelogQuery, (updatelog_err, updatelog_result) => {
  var returnMsg = "";
  if (updatelog_err){
    console.log(updatelog_err);
    returnMsg = "Error";
    }
    else{
        console.log(" record updated"); 
        returnMsg = "Log updated";
    }
    res.send({serverMessage: returnMsg});
  });
});



module.exports = updatelogRouter;