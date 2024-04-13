const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckOutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));
// WITH .route() is for chainable requests
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
