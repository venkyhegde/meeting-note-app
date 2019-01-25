var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');


var app = express();
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// connect to database
mongoose.connect("mongodb://testuser:test123@ds141623.mlab.com:41623/my-database",  { useNewUrlParser: true } );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/newEntry', indexRouter);
module.exports = app;
