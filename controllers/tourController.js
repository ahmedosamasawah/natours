const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');

exports.aliasTopCheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,duration,difficulty,summary,ratingsAverage';

  next();
};

exports.getAllTours = catchAsyncError(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

exports.getOneTour = catchAsyncError(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) return next(new AppError('No tour found with that ID!', 404));

  res.status(200).json({
    status: 'success!',
    data: {
      tour,
    },
  });
});

exports.addNewTour = catchAsyncError(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success!',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsyncError(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  });

  if (!tour) return next(new AppError('No tour found with that ID!', 404));

  res.status(200).json({
    status: 'success!',
    data: {
      tour,
    },
  });
});

exports.deleteOneTour = catchAsyncError(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) return next(new AppError('No tour found with that ID!', 404));

  res.status(204).json({
    status: 'success!',
    data: {
      message: 'Successfully deleted!',
      tour: null,
    },
  });
});
