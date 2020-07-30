var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileUpload =  require('express-fileupload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var areaRouter = require('./routes/area');
var cityRouter = require('./routes/city');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var productRouter = require('./routes/product');
var faqRouter = require('./routes/faq');
var feedbackRouter = require('./routes/feedback');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard', saveUninitialized:true, resave: false, cookie: {maxAge: Infinity} }));
app.use(fileUpload());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/area', areaRouter);
app.use('/city', cityRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/product', productRouter);
app.use('/faq', faqRouter);
app.use('/feedback', feedbackRouter);

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