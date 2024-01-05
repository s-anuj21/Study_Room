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

// exports.updateGroup = catchAsyncError(async (req, res, next) => {
//   const grpId = req.params.grpId;
//   const group = await Group.findById(grpId);
//   if (!group) return next(new AppError(`Grp Doesn't exist`));

//   req.files.forEach((el) => {
//     group.studyMaterial.push(el.originalname);
//   });

//   await group.save();
//   res.status(200).json({
//     status: 'success',
//   });
// });

// CREATING TOKEN ,WHICH WILL BE USED WHILE JOINING GRP
exports.getJoinLink = catchAsyncError(async (req, res) => {
  const group = await Group.findById(req.params.grpId);
  const joinToken = await group.createJoinToken();

  let joinUrl = '';
  if (process.env.NODE_ENV == 'development')
    joinUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/groups/${req.params.grpId}/joinGroup/${joinToken}`;
  else
    joinUrl = `${req.protocol}://${req.hostname}/groups/${req.params.grpId}/joinGroup/${joinToken}`;

  // await new Email(
  //   req.user,
  //   joinUrl,
  //   'anuj992393@gmail.com',
  //   group.name
  // ).sendJoinLink();

  await res.status(200).json({
    status: 'success',
    joinLink: joinUrl,
  });
});

exports.deleteGroup = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has been not implemented yet',
  });
};
