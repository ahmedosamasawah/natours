const Tour = require('../models/tourModel');
const factory = require('./handlerFactory');

exports.aliasTopCheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,duration,difficulty,summary,ratingsAverage';

  next();
};

exports.addNewTour = factory.addOne(Tour);
exports.getAllTours = factory.getAll(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteOneTour = factory.deleteOne(Tour);
exports.getOneTour = factory.getOne(Tour, { path: 'reviews' });
