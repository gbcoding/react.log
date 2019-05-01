// import libraries
const express = require('express');
const path = require('path');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan')
const createError = require('http-errors');

const indexRouter = require('./routes/indexRouter');

//for PDF
const pdf = require('html-pdf');
const pdfTemplate = require('./documents/index');

//for PDF 2
const pdf2 = require('html-pdf');
const pdfTemplate2 = require('./documents/index2');

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

//POST - PDF generation/fetching data
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('results.pdf', (err) => {
    if(err) {
        res.send(Promise.reject());
        //return console.log('error');
    }
      res.send(Promise.resolve())
  });
});

//GET - Send generated PDF to client
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/results.pdf`);
});

      //POST - PDF generation/fetching data 2
      app.post('/create-pdf2', (req, res) => {
        pdf2.create(pdfTemplate2(req.body), {}).toFile('results.pdf', (err) => {
          if(err) {
              res.send(Promise.reject());
              //return console.log('error');
          }
            res.send(Promise.resolve())
        });
      });

      //GET - Send generated PDF to client
      app.get('/fetch-pdf2', (req, res) => {
        res.sendFile(`${__dirname}/results.pdf`);
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
