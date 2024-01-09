const express = require('express');

const router = express.Router();

const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');
const messageController = require('../controllers/messageController');

// Restrticting
router.use(authController.protect);

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);

router.put(
  '/joinByCode',
  groupController.joinGroupByToken,
  viewController.joinGroup
);

router
  .route('/:grpId')
  .get(groupController.getGroup)
  .delete(groupController.deleteGroup)
  .put(groupController.updateGroup);

router.put('/:grpId/sendInvite', groupController.sendJoinLink);
router.get(
  '/:grpId/generateJoinCode',
  groupController.generateJoinCode,
  viewController.joinGroup
);
router.post('/:grpId/chatRoom/:userId', messageController.sendMessage);

module.exports = router;
