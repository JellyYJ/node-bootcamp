const express = require('express');
const router = express.Router({ mergeParams: true }); // get access to route in parameters in other router(tourRoutes)

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// Example nested routes
// POST /tour/234fad4/reviews
// GET  /tour/234fad4/reviews

// make sure the users having the role "user" can post (not admin or guide)
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
