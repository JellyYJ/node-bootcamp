const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

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
