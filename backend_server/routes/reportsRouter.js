var express = require('express');
var reportsRouter = express.Router();

//for PDF
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index');

//for PDF 2
const pdf2 = require('html-pdf');
const pdfTemplate2 = require('../documents/index2');

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


//POST - PDF generation/fetching data
reportsRouter.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('results.pdf', (err) => {
    if(err) {
        res.send(Promise.reject());
        //return console.log('error');
    }
      res.send(Promise.resolve())
  });
});

//GET - Send generated PDF to client
reportsRouter.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/results.pdf`);
});

//POST - PDF generation/fetching data 2
reportsRouter.post('/create-pdf2', (req, res) => {
  pdf2.create(pdfTemplate2(req.body), {}).toFile('results.pdf', (err) => {
    if(err) {
        res.send(Promise.reject());
        //return console.log('error');
    }
      res.send(Promise.resolve())
  });
});

//GET - Send generated PDF to client
reportsRouter.get('/fetch-pdf2', (req, res) => {
  res.sendFile(`${__dirname}/results.pdf`);
});


module.exports = reportsRouter;