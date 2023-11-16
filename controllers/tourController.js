const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail!',
      message: err,
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success!',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      result: 'fail',
      message: err,
    });
  }
};

exports.addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    console.log(newTour);

    res.status(201).json({
      status: 'success!',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(201).json({
      status: 'fail!',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    res.status(200).json({
      status: 'success!',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      result: 'fail',
      message: err,
    });
  }
};

exports.deleteOneTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    res.status(204).json({
      status: 'success!',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      result: 'fail',
      message: err,
    });
  }
};
