const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { catchAsyncError } = require('../utils/util');
const AppError = require('../utils/appError');

// A MIDDLEWARE TO RESTRIC USER ACCESS TO CERTAIN FUNCTIONN,
exports.isloggedIn = catchAsyncError(async (req, res, next) => {
  // 1. GET THE TOKEN IF IT EXIST
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  // 2. VALIDATE TOKEN
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. CHECK IF USER STILL EXIST
  const currUser = await User.findOne({ _id: decoded.id });

  if (!currUser) {
    return next();
  }

  // 4. CHECK IF USER CHANGED PASSWORD AFTER JWT SIGN
  // NOT NEEDED NOW

  // PASSING THE USER TO RES.LOCALS, SO THAT TO ACCESS IT IN PUG
  res.locals.user = currUser;
  next();
});

// A MIDDLEWARE TO RESTRICT USER ACCESS TO CERTAIN FUNCTIONN,
exports.protect = catchAsyncError(async (req, res, next) => {
  // 1. GET THE TOKEN IF IT EXIST
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split[' '][1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('User is not logged in', 401));
  }

  // 2. VALIDATE TOKEN
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. CHECK IF USER STILL EXIST
  const currUser = await User.findOne({ _id: decoded.id });

  if (!currUser) {
    return next(
      new AppError(`User doesn't exists now, please log in again`, 401)
    );
  }

  // 4. CHECK IF USER CHANGED PASSWORD AFTER JWT SIGN
  // NOT NEEDED, FOR NOW, AS CHANGED PASSWORD IS NOT IMPLEMENTED

  req.user = currUser;
  next();
});

// JWT RECOMMENDS THE SECRET LENGTH TO BE OF ATLEAST 32 CHARACTER
const sendJwtToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),

    // secure: true,
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  // IF USER ALREADY EXIST, CREATE ERROR
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return next(new AppError('Email Already exist, please login.', 500));

  // ELSE CREATE USER
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  sendJwtToken(user, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // 1. CHECK IF EMAIL PASSWORD EXIST
  if (!email || !password) {
    return next(new AppError('Please enter email and password!', 404));
  }
  // 2. CHECK IF USER EXIST AND PASSWORD IS CORRECT
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid Email or Password!', 500));
  }

  // 3. SEND TOKEN TO CLIENT
  sendJwtToken(user, res);
});

// ROUTE WHEN USERS CLICKS ON LOGOUT IN NAV
exports.logout = (req, res, next) => {
  // MAKING THE JWT TO EXPIRE IN 1 MILLISEC
  res.cookie('jwt', undefined, {
    expires: new Date(Date.now() + 1),
  });
  res.status(200).json({
    status: 'success',
  });
};
