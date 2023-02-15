const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { catchAsyncError } = require('../utils/util');
const AppError = require('../utils/appError');

// A middleware to restric user access to certain functionn,
exports.isloggedIn = catchAsyncError(async (req, res, next) => {
  // 1. Get the token if it exist
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  // 2. Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user still exist
  const currUser = await User.findOne({ _id: decoded.id });

  if (!currUser) {
    return next();
  }

  // 4. Check if user changed password after jwt sign
  // Will do afterwards

  // Passing the user to res.locals, so that to access it in locals
  res.locals.user = currUser;
  next();
});

// A middleware to restrict user access to certain functionn,
exports.protect = catchAsyncError(async (req, res, next) => {
  // 1. Get the token if it exist
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

  // 2. Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user still exist
  const currUser = await User.findOne({ _id: decoded.id });

  if (!currUser) {
    return next(
      new AppError(`User doesn't exists now, please log in again`, 401)
    );
  }

  // 4. Check if user changed password after jwt sign
  // Will do afterwards

  req.user = currUser;
  next();
});

// jwt recommends the secret length to be of atleast 32 character
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
    status: 'Success',
    token,
  });
};

exports.signup = catchAsyncError(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  sendJwtToken(user, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // 1. Check if email password exist
  if (!email || !password) {
    return next(new AppError('Please enter email and password!', 404));
  }
  // 2. Check if user exist and password is correct
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid Email or Password!', 500));
  }

  // 3. Send token to client
  sendJwtToken(user, res);
});

// Route when users clicks on logout in nav
exports.logout = (req, res, next) => {
  // Making the jwt to expire in 1 millisec
  res.cookie('jwt', undefined, {
    expires: new Date(Date.now() + 1),
  });
  res.status(200).json({
    status: 'success',
  });
};
