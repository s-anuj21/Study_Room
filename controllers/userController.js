const Group = require('../models/groupModel');
const User = require('../models/userModel');
const { catchAsyncError } = require('../utils/util');

exports.updateMe = catchAsyncError(async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const user = req.user;

  // 1. Currently, implementing this to only add grps to user
  if (req.body.groupId) {
    user.groups.push(req.body.groupId);
    await user.save();

    const grp = await Group.findById(req.body.groupId);
    grp.members.push(user._id);
    await grp.save();
  } else {
    res.status(500).json({
      status: 'error',
      message: 'This route has been not implemented yet',
    });
  }

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

// Function which is for admin
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};

exports.getAllUsers = (req, res) => {
  console.log(req.body);
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};
