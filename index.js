// THIS FILE WILL CONTAIN CONFIGURATION WHICH IS RELATED TO EXPRESS
const path = require('path');
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();

// Adding chatRoom
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('new_user_joined', (data) => {
    // Creating room for this group id
    socket.join(data.groupId);

    // sockets.in(data.groupId).emit('user_joined', data.user); //emits to all
    socket.broadcast.to(data.groupId).emit('user_joined', data.user);
  });

  socket.on('msg-send', (data) => {
    socket.join(data.groupId);

    // sockets.in(data.groupId).emit('msg-receive', data);
    socket.broadcast.to(data.groupId).emit('msg-receive', data);
    console.log(data);
  });
});

server.listen(4000, () => console.log(`App listening on port 4000`));

const userRouter = require('./routes/userRoutes');
const groupRouter = require('./routes/groupRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');

app.set('view engine', 'pug');
// __dirname -> current directory
app.set('views', path.join(__dirname, 'views'));

// FOR GOING TO THE EXACT PATH, IN THE PUG, WE ARE MOVING CURRENT DIR TO PUBLIC
app.use(express.static(path.join(__dirname, '/public')));

// express.json() is a middleware, it parses the json in the incoming req object
app.use(express.json());
// doubt
app.use(express.urlencoded({ extended: true }));

// IT ENABLES US TO USE DATA RECEIVED IN REQ.BODY
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// TO ACCESS COOKIE AT BACKEND
app.use(cookieParser());

// MOUNTING ROUTERS
app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/', viewRouter);

// A MIDDLEWARE WHICH RUNS A UNIDENFIED ROUTE IS CALLED
app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} on this server!`, 404));
});

// Catching Errors -> a very basic error handler
app.use((err, req, res, next) => {
  console.log('Inside Error Handler function....');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err);

  // WHEN DATA IS REQUESTED THROUGH API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      err: err.status,
      errror: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // WHEN PAGE IS REQUESTED
  else {
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
});

// END OF ERROR HANDLER FUNC

module.exports = app;
