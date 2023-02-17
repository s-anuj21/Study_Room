const Group = require('../models/groupModel');
const User = require('../models/userModel');
const { catchAsyncError } = require('../utils/util');

exports.updateMe = catchAsyncError(async (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.deleteMe = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};
