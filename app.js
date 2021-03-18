var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')

var app = express();

const url = 'mongodb+srv://dbUser:dbPassword@cluster0.gwyww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connect = mongoose.connect(url,{ useNewUrlParser: true });
connect.then((db)=>{
  console.log('connected correctly to serve to accidents');
},(err)=>{console.log(err)});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin:'http://localhost:4200'}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"public/index.html"))
})

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