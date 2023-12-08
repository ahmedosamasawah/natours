const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);
router.post('/submit-user-data', authController.protect, viewsController.updateUserData);

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);

module.exports = router;
