const db = require('mysql');

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
  
  console.log('Connected to db as id ' + db.threadId);
});


// Write functions that sanitize all data before passing them into a query.


// Sanitize data
/*
create(){


};

// 
readQuery(){

};


updateQuery(){

};

deleteQuery(){

}*/