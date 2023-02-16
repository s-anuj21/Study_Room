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

  for (let i = 0; i < grps.length; i++) {
    let currUser = await User.findById(grps[i].leader);
    grps[i].leaderName = currUser.name;
  }

  res.status(200).render('dashboard', {
    title: 'Study Room',
    grps,
  });
});

exports.getGroupDetails = async (req, res, next, newUser = false) => {
  try {
    const group = await Group.findById(req.params.grpId);

    if (!group) return next(new AppError('Invalid Group Id'));

    const members = await User.find({
      _id: { $in: group.members },
    });

    // Check if user is not present in members, than divert to dashboard
    if (!group.members.includes(req.user._id)) {
      return res.redirect('/');
    }

    res.status(200).render('grpDetail', {
      title: 'Study Room',
      group,
      members,
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

// Adding user to group and group to user
exports.joinGroup = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  const group = await Group.findById(req.params.grpId);

  // If user already exist then redirect to dashboard
  if (group.members.includes(user._id)) {
    return res.redirect('/');
  }

  await User.updateOne(
    { _id: user._id },
    { $addToSet: { groups: req.params.grpId } }
  );

  await Group.updateOne(
    { _id: req.params.grpId },
    { $addToSet: { members: user._id } }
  );

  this.getGroupDetails(req, res, next, true);
});

exports.deleteGroup = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};

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
