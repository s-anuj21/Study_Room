const express = require('express');

const router = express.Router();

const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

// Restrticting
router.use(authController.protect);

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);

router
  .route('/:grpId')
  .get(groupController.getGroup)
  .post(groupController.uploadMaterial, groupController.updateGroup)
  .delete(groupController.deleteGroup);

router.get('/download/:itemName', groupController.downloadItem);
router.get('/:grpId/joinToken', groupController.getJoinLink);

module.exports = router;
