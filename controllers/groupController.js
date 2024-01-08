const Group = require('../models/groupModel');
const User = require('../models/userModel');
const { catchAsyncError } = require('../utils/util');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

exports.getAllGroups = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};

exports.getGroup = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};

exports.createGroup = catchAsyncError(async (req, res, next) => {
  const grp = await Group.create({
    name: req.body.name,
    subject: req.body.subject,
    admin: req.user._id,
    endDate: req.body.endDate,
    members: [req.user._id],
  });

  if (!grp) {
    return next(new AppError('Grp Creation Failed!!!', 500));
  }

  // UPDATING GROUP USER SCHEMA
  await User.updateOne(
    { _id: req.user._id },
    { $addToSet: { groups: grp._id } }
  );

  res.status(200).json({
    status: 'success',
    grp,
  });
});

exports.updateGroup = catchAsyncError(async (req, res, next) => {
  const { grpId } = req.params;
  const { name, subject, endDate } = req.body;

  const group = await Group.findByIdAndUpdate(grpId, {
    name,
    subject,
    endDate,
  });

  if (!group) return next(new AppError(`Grp Doesn't exist`));

  res.status(200).json({
    status: 'success',
  });
});

exports.deleteGroup = catchAsyncError(async (req, res, next) => {
  const { grpId } = req.params;
  // Check if user is admin

  const group = await Group.findById(grpId);

  if (!group) return next(new AppError(`Group Doesn't exist`));

  if (req.user._id.toString() !== group.admin.toString())
    return next(new AppError(`You are not authorized to delete this group!!`));

  await Group.findByIdAndDelete(grpId);

  res.status(200).json({
    status: 'success',
    message: 'Group Deleted!',
  });
});

// CREATING TOKEN ,WHICH WILL BE USED WHILE JOINING GRP
exports.sendJoinLink = catchAsyncError(async (req, res) => {
  const group = await Group.findById(req.params.grpId);
  const joinToken = await group.createJoinToken();

  let joinUrl = '';
  if (process.env.NODE_ENV === 'development')
    joinUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/groups/${req.params.grpId}/joinGroup/${joinToken}`;
  else
    joinUrl = `${req.protocol}://${req.hostname}/groups/${req.params.grpId}/joinGroup/${joinToken}`;

  const { emailId } = req.body;
  await new Email(req.user, joinUrl, emailId, group.name).sendJoinLink();

  await res.status(200).json({
    status: 'success',
    message: 'Join Link Sent!',
    joinLink: joinUrl,
  });
});

exports.generateJoinCode = catchAsyncError(async (req, res, next) => {
  const group = await Group.findById(req.params.grpId);
  const joinToken = await group.createJoinToken();
  console.log(joinToken);

  const joinTokenWithGrp = `${req.params.grpId}=${joinToken}`;

  res.status(200).json({
    status: 'success',
    joinTokenWithGrp,
  });
});
