var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socket = require('socket.io')


var usersRouter = require('./routes/front/users');
var messagesRouter = require('./routes/front/messages');
var loginRouter = require('./routes/front/login');

var messagesApi = require('./routes/api/messages');
var loginApi = require('./routes/api/login');

var app = express();



const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  //Autorisation modification de la sécurité de l'api
  res.header('Access-Control-Expose-Headers','Authorization');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/chat', messagesRouter);
app.use('/login', loginApi);
app.use('/messages', messagesApi);

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
  res.json({err : err });
});

module.exports = app;
