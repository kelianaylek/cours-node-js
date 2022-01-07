var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/front/index');
var usersRouter = require('./routes/front/users');
var messagesRouter = require('./routes/front/messages');
var loginRouter = require('./routes/front/login');
var loginApi = require('./routes/api/login');

var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  //Autorisation modification de la sécurité de l'api
  res.header('Access-Control-Expose-Headers','Authorization');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/login', loginRouter);
app.use('/connection', loginApi);

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
