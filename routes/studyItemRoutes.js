const express = require('express');

const router = express.Router();

const studyItemController = require('../controllers/studyItemController');
const authController = require('../controllers/authController');

// Restrticting
router.use(authController.protect);

router.get('/:grpId', studyItemController.getAllItems);
router.post(
  '/',
  studyItemController.uploadItem,
  studyItemController.createItem
);
router
  .route('/:itemId')
  .get(studyItemController.getItem)
  .delete(studyItemController.deleteItem);

router.get('/download', studyItemController.downloadItem);

module.exports = router;