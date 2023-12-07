const Tour = require('../models/tourModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');

exports.aliasTopCheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,duration,difficulty,summary,ratingsAverage';

  next();
};

exports.getTourWithin = catchAsyncError(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) return next(AppError('Please provide latitude and longitude in the format: lat, lng'), 400);

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success!',
    results: tours.length,
    data: { tours },
  });
});

exports.getDistances = catchAsyncError(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) return next(AppError('Please provide latitude and longitude in the format: lat, lng'), 400);

  const multiplier = unit === 'mi' ? 0.000621371192 : 0.001;

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    { $project: { name: 1, distance: 1 } },
  ]);

  res.status(200).json({
    status: 'success!',
    results: distances.length,
    data: { distances },
  });
});

exports.addNewTour = factory.addOne(Tour);
exports.getAllTours = factory.getAll(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteOneTour = factory.deleteOne(Tour);
exports.getOneTour = factory.getOne(Tour, { path: 'reviews' });
