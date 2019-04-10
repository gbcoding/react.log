var express = require('express');
var addlogRouter = express.Router();

const mysql = require('mysql');
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




// Send message to addlog
addlogRouter.get('/', (req, res, next) =>{ 
    res.send({
        serverMessage: "Connected to addlog page of backend"
    });
  
});
  
  // Get addlog form data
addlogRouter.post('/', (req, res, next) => {
    const data = req.body;
    try
    {
      console.log(data);
    }
    catch(error){
      console.log(error);
    }

    // Add log form data
    var entryID = 0;
    var userID = 3;
    var logID = 1;

    var date = '2019-03-08';
    var time = '06:03:12';
    var mealType = data.mealType;
    var foodConsumed = data.foodName;
    var issueFlag = 1;
    var duration = data.duration;
    var severity = data.severity;
    var notes = data.notes;

            db.query('ALTER TABLE food_log AUTO_INCREMENT = 1', (incr_err, incr_result) => {
                if (incr_err) {
                    console.log("Increment error:" + incr_err);  
                }
                console.log("Incr result = " + JSON.stringify(incr_result));
            });
        
            // Insert new log into add log table
            const addlogQuery = 'INSERT INTO food_log (entry_id, user_id, log_id, date, time, meal_type, food_consumed, issue_flag, duration, severity, notes) VALUES (\''+ entryID + '\', \'' + userID + '\', \'' + logID + '\', \'' + date +'\', \'' + time + '\', \'' + mealType +'\', \'' + foodConsumed + '\', \'' + issueFlag +'\', \'' + duration + '\', \'' + severity +'\', \'' + notes + '\')';
            db.query(addlogQuery, (addlog_err, addlog_result) => {
                if (addlog_err){
                    console.log("Add log Error: " + addlog_err);
                }
                console.log(" record inserted");
                                
            });
});

module.exports = addlogRouter;