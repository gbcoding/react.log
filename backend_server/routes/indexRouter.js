var express = require('express');
var indexRouter = express.Router();

const loginRouter = require('./loginRouter');
const signupRouter = require('./signupRouter');
const homeRouter = require('./homeRouter');
const logviewRouter = require('./logviewRouter');

//Route requests
indexRouter.use('/login', loginRouter); 
indexRouter.use('/signup', signupRouter);
indexRouter.use('/home', homeRouter);
indexRouter.use('/logview', logviewRouter);

/* GET home page. */
indexRouter.get('/', function(req, res, next) {

  console.log("Homepage Accessed");
});

module.exports = indexRouter;