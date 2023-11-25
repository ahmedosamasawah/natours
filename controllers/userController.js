// const AppError = require('../utils/appError');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');

const filterObj = (obj, ...targetFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((el) => {
    if (targetFields.includes(el)) filteredObj[el] = obj[el];
  });

  return filteredObj;
};

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.updateUserData = catchAsyncError(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route is not for password updating! Please use /updatePassword.', 400));

  const allowedFields = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, allowedFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success!',
    data: {
      users: updatedUser,
    },
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'success!',
    message: 'User deleted successfully!',
  });
});

exports.getOneUser = (req, res) => {
  res.status(200).json({
    status: 'success!',
  });
};

exports.addNewUser = (req, res) => {
  res.status(201).json({
    status: 'user added successfully!',
  });
};

exports.updateUser = (req, res) => {
  res.json({
    status: 'user updated successfully!',
  });
};

exports.deleteOneUser = (req, res) => {
  res.json({
    status: 'user deleted successfully!',
  });
};
