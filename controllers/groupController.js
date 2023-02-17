const path = require('path');
const multer = require('multer');
const Group = require('../models/groupModel');
const User = require('../models/userModel');
const { catchAsyncError } = require('../utils/util');
const AppError = require('../utils/appError');

exports.getAllGroups = (req, res) => {
  // console.log(req.body);
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

exports.downloadItem = catchAsyncError(async (req, res, next) => {
  const filePath = path.join(
    __dirname,
    `../public/res/studyMaterials/${req.params.itemName}`
  );
  // console.log(filePath);
  await res.download(filePath);
});

exports.createGroup = catchAsyncError(async (req, res, next) => {
  const grp = await Group.create({
    name: req.body.name,
    subject: req.body.subject,
    leader: req.user._id,
    endDate: req.body.endDate,
    members: [req.user._id],
  });

  if (!grp) {
    return next(new AppError('Grp Creation Failed!!!', 500));
  }

  // Updating Group User Schema
  await User.updateOne(
    { _id: req.user._id },
    { $addToSet: { groups: grp._id } }
  );

  res.status(200).json({
    status: 'success',
    grp,
  });
});

//Spent 3 Hours figuring this
//1) req.body and req.file is set by multer
const multerStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'public/res/studyMaterials');
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
});

// it returns a middleware func, which is assigned to uploadMaterial
exports.uploadMaterial = upload.array('files');

exports.updateGroup = catchAsyncError(async (req, res, next) => {
  const grpId = req.params.grpId;
  console.log('b', req.params);
  const group = await Group.findById(grpId);
  if (!group) return next(new AppError(`Grp Doesn't exist`));

  req.files.forEach((el) => {
    group.studyMaterial.push(el.originalname);
  });

  await group.save();
  res.status(200).json({
    status: 'success',
  });
});

// Creating Token ,which will be used while joining grp
exports.getJoinLink = catchAsyncError(async (req, res) => {
  const group = await Group.findById(req.params.grpId);
  const joinToken = await group.createJoinToken();

  console.log(req.protocol, req.hostname);

  const joinUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/groups/${req.params.grpId}/joinGroup/${joinToken}`;

  console.log(joinUrl);

  res.status(200).json({
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
