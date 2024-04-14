const express = require('express');
const router = express.Router({ mergeParams: true }); // get access to route in parameters in other router(tourRoutes)

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router.use(authController.protect);
router.use(authController.restrictTo('user'));

// Example nested routes
// POST /tour/234fad4/reviews
// GET  /tour/234fad4/reviews

// make sure the users having the role "user" can post (not admin or guide)
router.route('/').get(reviewController.getAllReviews).post(
  authController.restrictTo('user'),
  reviewController.setTourUserIds, // since we want to use factory, we need to add this
  reviewController.createReview
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
