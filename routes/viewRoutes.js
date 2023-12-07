const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/login', viewsController.getLoginForm);
router.get('/tour/:slug', authController.protect, viewsController.getTour);
router.get('/signup', viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.post('/submit-user-data', authController.protect, viewsController.updateUserData);

module.exports = router;
