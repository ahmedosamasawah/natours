const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRoutes);

router.route('/top-5-cheap').get(tourController.aliasTopCheap, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.addNewTour);

router.route('/tour-within/distances/:latlng/unit/:unit').get(tourController.getDistances);
router.route('/tour-within/:distance/center/:latlng/unit/:unit').get(tourController.getTourWithin);

router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteOneTour);

module.exports = router;
