const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  if (!reviews) {
    return next(new AppError('No review found'));
  }
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
