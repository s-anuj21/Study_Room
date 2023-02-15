// This file will contain configuration which is related to express
const path = require('path');
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();
const userRouter = require('./routes/userRoutes');
const groupRouter = require('./routes/groupRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');

app.set('view engine', 'pug');
// __dirname -> current directory
app.set('views', path.join(__dirname, 'views'));

// For going to the exact path, in the pug, we are moving current dir to public
app.use(express.static(path.join(__dirname, '/public')));

// express.json() is a middleware, it parses the json in the incoming req object
app.use(express.json());
// doubt
app.use(express.urlencoded({ extended: true }));

// Need to find out why dout
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// To access cookie at backend
app.use(cookieParser());

// Mounting Routers

app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/', viewRouter);

// A middleware which runs a unidenfied route is called
app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} on this server!`, 404));
});

// Catching Errors -> a very basic error handler
app.use((err, req, res, next) => {
  console.log('Inside Error Handler function....');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // When data is requested through api
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      err: err.status,
      errror: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // When page is requested
  else {
    console.log(err);
    if (err.statusCode === 401) {
      return res.status(err.statusCode).render('login', {
        title: 'Login to Continue!!',
      });
    }

    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!!',
      message: err.message,
    });
  }

  console.log(err);

  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: err.message,
  // });
});

// End of error handler func

module.exports = app;
