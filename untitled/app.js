var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var NodeSession = require('node-session');
var nodeSession = new NodeSession({
    secret: '111',
    driver: 'file',
    lifetime:300000,//5mintrus,
    expireOnClose:true
});

var app = express();




var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var list = require('./routes/list');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(function(req, res, next){
  nodeSession.startSession(req, res, next);
});


//判断是否登录
function islogin(req,res,next){
    if(req.originalUrl == '/' || req.originalUrl === '/home') {
        console.log("Request page: " + req.originalUrl);
        console.log(req.session);
    }

    /**
    if(!req.session.has("users")) {
        if (req.originalUrl != '/') {
          if (req.originalUrl == '/index' && req.method == 'POST') {
          }else{
            return res.redirect('/');
          }
        }
     }

     */
  next();
}

//记录log日志
function loginlog(req,res,next){
    console.log(req.session.has("users"));
    console.log("记log");
    var value = req.session.get('users');
    if(value){
        //记录日志
        var fs = require('fs');
        var date = new Date();
        var path = __dirname + '/logs/'+ (date.getFullYear()).toString() + (date.getMonth()+1).toString() + date.getDate().toString() + '.txt';
        var content = date.toLocaleString() + ":[用户]" + value.userName + "\t[URL]" + req.originalUrl + "\n";
        fs.appendFile(path,content);
    }
    next();
}
app.use(islogin);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//app.use(loginlog);
app.use('/', routes);
app.use('/users', users);
app.use('/home',home);
app.use('/list',list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
