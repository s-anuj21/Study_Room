const express = require('express');

const router = express.Router();

const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

// Restrticting
router.use(authController.protect);

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);

router
  .route('/:grpId')
  .get(groupController.getGroup)
  .delete(groupController.deleteGroup)
  .put(groupController.updateGroup);

router.get('/:grpId/joinToken', groupController.getJoinLink);
router.post('/:grpId/chatRoom/:userId', messageController.sendMessage);

module.exports = router;
