// import libraries
const express = require('express');
const path = require('path');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan')
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

// Start Express app
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Set up login routing later
//app.use('/login', loginRouter);


const mysql = require('mysql');
// For security reasons, database info is not pushed to the repository
// user must create their own sqlDatabaseOptions.json file and add the information manually
const sqlDbOptions = require("./sqlDatabaseOptions.json");

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

// Send message to login
app.get('/login', (req, res, next) =>{ 
    res.send({
      serverMessage: "Connected to backend DB"
    });
  
 });
  
  // Get login form data
app.post('/login', (req, res, next) => {
    const data = req.body;
    try
    {
      //const formData = res.email;
      console.log(data);
      //console.log(res.password);
    }
    catch(error){
      console.log(error);
    }
  
   // Query database to see if data exists
    var email = data.email;
    const password = data.password;
  
    const loginQuery = 'SELECT * FROM users WHERE email_address = \''+ email +'\'';
  
    db.query(loginQuery, function(err, result) {
  
      if (err) throw err;
  
      console.log(result);
      var accountFound;
      if(result.length > 0){
        accountFound = "Your account was found!";
        console.log("Account Found");
        
      }
      else{
        accountFound = "You don't have an account"; 
        console.log("Account Not Found");
      }
  
      res.send({serverMessage: accountFound}); //Sends message as text
    });
  });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
