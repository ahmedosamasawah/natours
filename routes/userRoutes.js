const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.delete('/deleteUser', userController.deleteMyAccount);
router.patch('/updatePassword', authController.updatePassword);
router.patch('/updateUserData', userController.updateUserData);
router.get('/myInfo', userController.getMyInfo, userController.getUser);

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers).post(userController.addNewUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
