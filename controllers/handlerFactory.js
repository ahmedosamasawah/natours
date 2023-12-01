const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncError = require('../utils/catchAsyncError');

exports.deleteOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) return next(new AppError('No document found with that ID!', 404));

    res.status(204).json({
      status: 'success!',
      message: 'Document Deleted Successfully!',
    });
  });

exports.updateOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    if (!document) return next(new AppError('No document found with that ID!', 404));

    res.status(200).json({
      status: 'success!',
      data: {
        data: document,
      },
    });
  });

exports.addOne = (Model) =>
  catchAsyncError(async (req, res) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: 'success!',
      data: {
        data: document,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsyncError(async (req, res, next) => {
    let document;

    if (popOptions) document = await Model.findById(req.params.id).populate(popOptions);
    document = await Model.findById(req.params.id);

    if (!document) return next(new AppError('No document found with that ID!', 404));

    res.status(200).json({
      status: 'success!',
      data: {
        data: document,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();

    const document = await features.query;

    res.status(200).json({
      status: 'success!',
      result: document.length,
      data: {
        data: document,
      },
    });
  });
