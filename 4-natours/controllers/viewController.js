const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from the collection
  const tours = await Tour.find();
  // 2) Build template - pug
  // 3) Render the template using tour data
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fileds: 'review rating user',
  });
  res.status(200).render('tour', {
    title: 'The Hiker Tour',
    tour,
  });
});
