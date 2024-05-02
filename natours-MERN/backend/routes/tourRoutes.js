const express = require('express');
const router = express.Router();

// import from controllers
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const reviewRouter = require('../routes/reviewRoutes');

// checkID middleware function (no longer needed))
// router.param('id', tourController.checkID);

// Create a checkBody middleware function (no longer needed))
// Check if body contains the name and price property. If not, send back 400
// Add it to the post handler stack.

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
// .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.deleteTour
  );

// Merge params
router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
