const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/sendEmail');
const catchAsyncError = require('../utils/catchAsyncError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success!',
    token,
    data: { user: newUser },
  });
});

exports.signin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password!', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password!', 401));
  }

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success!',
    token,
  });
});

exports.protect = catchAsyncError(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token) return next(new AppError('You are not logged in! Please log in to have access.', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(new AppError('The user belonging to this user in no longer exist! Please log in again.', 401));

  if (currentUser.passwordChangedAfter(decoded.iat))
    return next(new AppError('User changed the password! Please log in again.'));

  req.user = currentUser;
  next();
});

exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('There is no user with this email!', 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to ${resetUrl}\nIf you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({ email: user.email, subject: 'Your password reset token. (Valid for 10 minutes)', message });

    res.status(200).json({
      status: 'success!',
      message: 'Token sent to email successfully!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email! Try again later.', 500));
  }
});
