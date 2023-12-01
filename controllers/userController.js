const factory = require('./handlerFactory');
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

exports.getMyInfo = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

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

exports.deleteMyAccount = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'success!',
    message: 'User deleted successfully!',
  });
});

exports.addNewUser = (req, res) => {
  res.status(500).json({
    status: 'error!',
    message: 'This route is not defined! Please use /signup instead!',
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
