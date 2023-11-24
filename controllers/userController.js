// const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

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
