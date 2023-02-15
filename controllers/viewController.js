const Group = require('../models/groupModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { catchAsyncError } = require('../utils/util');

exports.getDashboard = catchAsyncError(async (req, res, next) => {
  let grps = {};

  if (req.user) {
    grps = await Group.find({
      _id: { $in: req.user.groups },
    });
  }

  res.status(200).render('dashboard', {
    title: 'Study Room',
    grps,
  });
});

exports.getGroupDetails = catchAsyncError(async (req, res, next) => {
  const group = await Group.findById(req.params.grpId);

  if (!group) return next(new AppError('Invalid Group Id'));

  const members = await User.find({
    _id: { $in: group.members },
  });

  res.status(200).render('grpDetail', {
    title: 'Study Room',
    group,
    members,
  });
});

exports.getGrpCreationForm = (req, res, next) => {
  res.status(200).render('grpCreation', {
    title: 'Study Room',
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Study Room - Log in',
  });
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Study Room - Create an account',
  });
};
