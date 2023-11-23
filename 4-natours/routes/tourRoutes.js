const express = require('express');

const fs = require('fs');

const router = express.Router();

// import from userController
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

// checkID middleware function (no longer needed))
// router.param('id', tourController.checkID);

// Create a checkBody middleware function (no longer needed))
// Check if body contains the name and price property. If not, send back 400
// Add it to the post handler stack.

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
// .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
