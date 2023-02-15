const express = require('express');

const router = express.Router();

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.use(authController.isloggedIn);

router.get('/', authController.protect, viewController.getDashboard);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/group/:grpId', viewController.getGroupDetails);

router.get('/createGroup', viewController.getGrpCreationForm);

module.exports = router;
