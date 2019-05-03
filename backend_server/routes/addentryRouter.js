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

  var meal_type = data.meal_type;
  var food_consumed = data.food_consumed;
  var issue_flag = data.issue_flag;
  var duration = data.duration;
  var severity = data.severity;
  var notes = data.notes;
  //var date = data.date;
  //var time = data.time;

  try{
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var hour = today.getHours(); 
    var min = today.getMinutes();
    var sec = today.getSeconds();
    }
    catch(error){
        console.log(error);
    }
    var date = y + '-'+ m + '-' + d;
    var time = hour + ':' + min + ':' + sec;

    console.log("Date: " + date)
    console.log("Time: " + time)
    db.query('ALTER TABLE food_log AUTO_INCREMENT = 1', (incr_err, incr_result) => {
        if (incr_err) {
            console.log("Increment error:" + incr_err);  
        }
        console.log("Incr result = " + JSON.stringify(incr_result));
    });

   

    const getEIDSizeQuery = 'SELECT max(entry_id) AS eidMax FROM food_log';
    db.query(getEIDSizeQuery, (EIDsize_err, EIDsize_result) => {
        if (EIDsize_err){
            console.log(EIDsize_err);
        }
        var entryID = EIDsize_result[0].eidMax;
        console.log(entryID);
        entryID = entryID + 1;
        console.log(entryID);

        const getLIDSizeQuery = 'SELECT max(log_id) AS lidMax FROM food_log WHERE user_id=\''+ user_id +'\'';
        db.query(getLIDSizeQuery, (LIDsize_err, LIDsize_result) => {
            if (EIDsize_err){
                console.log(LIDsize_err);
            }

            var logID = LIDsize_result[0].lidMax;
            console.log(logID);
            logID = logID + 1;
            console.log(logID);

            // Insert new log into add log table
            const addlogQuery = 'INSERT INTO food_log (entry_id, user_id, log_id, date, time, meal_type, food_consumed, issue_flag, duration, severity, notes) VALUES (\''+ entryID + '\', \'' + user_id + '\', \'' + logID + '\', \'' + date +'\', \'' + time + '\', \'' + meal_type +'\', \'' + food_consumed + '\', \'' + issue_flag +'\', \'' + duration + '\', \'' + severity +'\', \'' + notes + '\')';
            db.query(addlogQuery, (addlog_err, addlog_result) => {
                var returnMsg = "";
                if (addlog_err){
                    console.log(addlog_err);
                    returnMsg = "Error";
                }
                else{
                    console.log(" record inserted"); 
                    returnMsg = "Log added";
                }
                res.send({serverMessage: returnMsg});
            });
        });
    });


});



module.exports = updatelogRouter;