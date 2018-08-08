const admin = require('firebase-admin');
const sak = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(sak),
  databaseURL: 'https://uw-course-planner.firebaseio.com'
});

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var plans = require('./routes/plans');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', index);
app.use('/api/users', users);
app.use('/api/plans', plans);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ status: err.status, message: err.message });
});

module.exports = app;
