const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.delete('/deleteUser', authController.protect, userController.deleteUser);
router.patch('/updatePassword', authController.protect, authController.updatePassword);
router.patch('/updateUserData', authController.protect, userController.updateUserData);

router.route('/').get(userController.getAllUsers).post(userController.addNewUser);
router.route('/:id').get(userController.getOneUser).patch(userController.updateUser).delete(userController.deleteOneUser);

module.exports = router;
