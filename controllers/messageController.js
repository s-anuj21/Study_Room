const Group = require('../models/groupModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const AppError = require('../utils/appError');
const { catchAsyncError } = require('../utils/util');

exports.sendMessage = catchAsyncError(async (req, res, next) => {
  const msg = await Message.create({
    content: req.body.inputMsg,
    user: req.params.userId,
    group: req.params.grpId,
  });
  if (!msg) return next(new AppError('Unable to send msgs now!!'), 500);

  await Group.updateOne(
    { _id: req.params.grpId },
    { $addToSet: { messages: msg._id } }
  );

  res.status(200).json({
    message: 'success',
    msg,
  });
});
