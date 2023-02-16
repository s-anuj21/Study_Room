const express = require('express');

const router = express.Router();

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.use(authController.isloggedIn);

router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);

router.use(authController.protect);
router.get('/', viewController.getDashboard);
router.get('/group/:grpId', viewController.getGroupDetails);
router.get('/createGroup', viewController.getGrpCreationForm);
router.get('/groups/:grpId/joinGroup/:joinToken', viewController.joinGroup);

module.exports = router;
