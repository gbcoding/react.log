var express = require('express');
var reportsRouter = express.Router();
const path = require('path');

var fs = require('fs');
var pdf = require('dynamic-html-pdf');
var html_full = fs.readFileSync(__dirname + '/../templates/fullReport.html', 'utf8');
var html_flagged = fs.readFileSync(__dirname + '/../templates/flaggedReport.html', 'utf8');

function currentTime(){
  var today = new Date();
  var hour = today.getHours(); 
  var min = today.getMinutes();
  var sec = today.getSeconds();
  return hour + ':' + min + ':' + sec;
}

function currentDate(){
  var today = new Date();
  var d = today.getDate();
  var m = today.getMonth() + 1;
  var y = today.getFullYear();
  return y + '-'+ m + '-' + d;
}

// Start Express app
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
  
  console.log('Connected reports to db as id ' + db.threadId);
});

// Send message to signup
reportsRouter.get('/', function(req, res) { 
   
    const user_id = req.query.user_id;

    console.log(user_id)
   const reportsQuery = 'SELECT * FROM food_log WHERE user_id = ?'; 
    db.query(reportsQuery, [user_id], function(err, results) {
      if(err) {
        return res.send(error);
      } else{
            
            return res.json({
              data: results
            });

        } 
    });   
});


//POST - PDF generation/fetching data
reportsRouter.post('/create-pdf-full', (req, res) => {

  const user_id = req.body.UID;
  const reportsQuery = 'SELECT * FROM food_log WHERE user_id = ?'; 

  db.query(reportsQuery, [user_id], function(err, results) {
    if(err) {
      console.log(err);
      return res.send(error);
    } 
    else{

      // Custom handlebar helper
    pdf.registerHelper('ifCond', function (v1, v2, options) {
      if (v1 === v2) {
          return options.fn(this);
      }
      return options.inverse(this);
    })

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm"
    };

    
    var document = {
      type: 'file',     // 'file' or 'buffer'
      template: html_full,
      context: {
          time: currentTime(),
          date: currentDate(),
          username: req.body.userName,
          items: results,

      },
      path: './documents/FullReport-'+user_id+'.pdf'    // it is not required if type is buffer
    };

    pdf.create(document, options)
      .then(res1 => {
          console.log(res1)
          res.status(200).send({ serverMessage: "Success"});
      })
      .catch(error => {
          console.error(error)
      });
    } 
  });   

});

//GET - Send generated PDF to client
reportsRouter.get('/fetch-pdf-full', (req, res) => {
  const user_id = req.query.user_id;
  console.log(user_id);
  res.sendFile(path.resolve('documents/FullReport-'+user_id+'.pdf'));
});


//POST - PDF generation/fetching data 2
reportsRouter.post('/create-pdf-flagged', (req, res) => {
   const user_id = req.body.UID;
  const reportsQuery = 'SELECT * FROM food_log WHERE user_id = ? && issue_flag = 1'; 
  
  db.query(reportsQuery, [user_id], function(err, results) {
    if(err) {
      console.log(err);
      return res.send(error);
    } 
    else{

      // Custom handlebar helper
    pdf.registerHelper('ifCond', function (v1, v2, options) {
      if (v1 === v2) {
          return options.fn(this);
      }
      return options.inverse(this);
    })

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm"
    };

    var document = {
      type: 'file',     // 'file' or 'buffer'
      template: html_flagged,
      context: {
          time: currentTime(),
          date: currentDate(),
          username: req.body.userName,
          items: results
      },
      path: './documents/FlaggedReport-'+user_id+'.pdf'    // it is not required if type is buffer
    };

    pdf.create(document, options)
      .then(res1 => {
          console.log(res1)
          res.status(200).send({ serverMessage: "Success"});
      })
      .catch(error => {
          console.error(error)
      });
    } 
  });   
});

//GET - Send generated PDF to client
reportsRouter.get('/fetch-pdf-flagged', (req, res) => {
  const user_id = req.query.user_id;
  res.sendFile(path.resolve('documents/FlaggedReport-'+user_id+'.pdf'));
});


module.exports = reportsRouter;