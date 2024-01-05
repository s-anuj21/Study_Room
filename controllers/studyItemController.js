const path = require('path');
const multer = require('multer');
const { catchAsyncError } = require('../utils/util');
const AppError = require('../utils/appError');
const StudyItem = require('../models/studyItemModel');

/**
 * @description: It downloads a study item file
 * @param {String} itemId
 */
exports.downloadItem = catchAsyncError(async (req, res, next) => {
  const item = await StudyItem.findById(req.params.itemId);

  if (!item) return next(new AppError('No Item Found!!!', 404));

  const filePath = path.join(
    __dirname,
    `../public/res/studyMaterials/${item.fileName}`
  );
  await res.download(filePath);
});

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

/**
 * @description: It return a middleware function which is assigned to uploadItem
 * @param {String} files
 */
exports.uploadItem = upload.array('files');

/**
 * @description: It creates a new study item
 * @param {String} grpId
 */
exports.createItem = catchAsyncError(async (req, res, next) => {
  const { grpId } = req.params;
  const { description } = req.body;
  const newItem = await StudyItem.create({
    fileName: req.files[0].originalname,
    description,
    group: grpId,
    user: req.user._id,
  });

  if (!newItem) return next(new AppError('Item Creation Failed!!!', 500));

  res.status(201).json({
    status: 'success',
    data: {
      newItem,
    },
  });
});

/**
 * @description: It returns all the items of a group
 * @param {String} grpId
 */

exports.getAllItems = catchAsyncError(async (req, res, next) => {
  const { grpId } = req.params;
  const items = await StudyItem.find({ group: grpId });

  if (!items) return next(new AppError('No Items Found!!!', 404));

  res.status(200).json({
    status: 'success',
    data: {
      items,
    },
  });
});

/**
 * @description: It deletes a study item
 * @param {String} itemId
 */
exports.deleteItem = catchAsyncError(async (req, res, next) => {
  const { itemId } = req.params;
  await StudyItem.findByIdAndDelete(itemId);

  res.status(204).json({
    status: 'success',
  });
});

exports.getItem = catchAsyncError(async (req, res, next) => {});
