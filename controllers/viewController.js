const Group = require('../models/groupModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { catchAsyncError } = require('../utils/util');

// THIS IS FOR DASHBOARD PAGE, WHICH IS CALLED ON '/'
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

// THIS RENDERS THE GROUPS DETAILS AND MEMBER INFO
exports.getGroupDetails = async (req, res, next, newUser = false) => {
  try {
    const group = await Group.findById(req.params.grpId);

    if (!group) return next(new AppError('Invalid Group Id'));

    const members = await User.find({
      _id: { $in: group.members },
    });

    // CHECK IF USER IS NOT PRESENT IN MEMBERS, THAN DIVERT TO DASHBOARD
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

  // IF USER ALREADY EXIST THEN REDIRECT TO DASHBOARD
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
