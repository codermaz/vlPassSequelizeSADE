var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// passport als Middleware
var passport = require('passport');
var session = require('express-session');


// bneu eingefügte Route info 
var secret = require('./routes/secret');
var info = require('./routes/info');
var login = require('./routes/login');
var logout = require('./routes/logout');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('models', path.join(__dirname, 'models'));
app.use(express.static(path.join(__dirname, 'public')));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connection = require('./models/index.js');


// Cookies erlauben
app.use(session({ cookie: { maxAge: 60000},
    secret: 'any',
    resave: false,
    saveUninitialized: false}));

// Passport als Middleware einbringen
app.use(passport.initialize());
app.use(passport.session());

//app.use('/info', info);
// login / Logout
app.use('/login', login);
app.use('/logout', logout);
app.use('/secret', secret);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// so kann die App mit node app.js gestartet werden. Der Server läuft ab hier. 
var port = 3000;
app.listen(port, function () {
  console.log('app listening on port ' + port);
});


module.exports = app;
