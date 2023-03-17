var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var homeRouter = require('./routes/clientRoutes/home');
var userRouter = require('./routes/clientRoutes/user');
var adminRouter = require('./routes/clientRoutes/admin');
var cropRouter = require('./routes/clientRoutes/crop');
var greenHouseRouter = require('./routes/clientRoutes/greenHouse')
var app = express();

app.use(
  cors({
    origin: "*"
  })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/crop', cropRouter);
app.use('/greenHouse',greenHouseRouter);
module.exports = app;
