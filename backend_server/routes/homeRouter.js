var express = require('express');
var router = express.Router();

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
  
  console.log('Connected home to db as id ' + db.threadId);
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("inside homeRouter")
  const user_id = req.query.user_id;
  const date = req.query.current_date;
  console.log("Home data: " + user_id + ".... " + date)
  const homeQuery = 'SELECT * FROM food_log WHERE user_id = \''+ user_id +'\' AND date = \'' + date + '\''; 
   
  db.query(homeQuery, function(err, results) {
      if(err) {
        return res.send(error);
      } 
      else{
            return res.json({
              data: results
            });
        } 
    });   
});

router.get('/:UID', function(req, res, next) {
  console.log("inside homerouter UID");
});

module.exports = router;
