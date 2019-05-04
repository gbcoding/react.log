var express = require('express');
var indexRouter = express.Router();

const homeRouter = require('./homeRouter');
const getlogRouter = require('./getlogRouter');
const addentryRouter = require('./addentryRouter');
const updatelogRouter = require('./updatelogRouter');
const deletelogRouter = require('./deletelogRouter');
const reportsRouter = require('./reportsRouter');

//Route requests
indexRouter.use('/home', homeRouter);
indexRouter.use('/get_log', getlogRouter);
indexRouter.use('/add_entry', addentryRouter);
indexRouter.use('/update_log', updatelogRouter);
indexRouter.use('/delete_log', deletelogRouter);
indexRouter.use('/reports', reportsRouter);

/* GET home page. */
indexRouter.get('/', function(req, res, next) {

  console.log("Homepage Accessed");
});

module.exports = indexRouter;