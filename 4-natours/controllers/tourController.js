// const fs = require('fs');

const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/**
 * Handlers for Tour
 */
// // convert the json format to an array of js objects (only for testing)
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// // checkID middleware function (no longer needed, only for showing middleware usage)
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       massage: 'Ivalid Id',
//     });
//   }
//   next();
// };

// checkBody middleware function (no longer needed, only for showing middleware usage)
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

/**
 * GET
 * 1. get all tours
 * 2. get one tour by id
 */

// 5) Aliasing - using middleware
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res) => {
  // console.log(req.requestTime);
  // // 1a) Filtering
  // // BUILD QUERY
  // const queryObj = { ...req.query }; // shallow copy of `req.query`
  // // delete some fields
  // const excludedFields = ['page', 'sort', 'limit', 'fields'];
  // excludedFields.forEach((el) => {
  //   delete queryObj[el];
  // });
  // console.log(req.query, queryObj);

  // // 1b) Advanced Filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // // console.log(JSON.parse(queryStr));
  // let query = Tour.find(JSON.parse(queryStr)); // Tour.find returns a query

  // // 2) Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  //   // query = query.sort(req.query.sort);
  // } else {
  //   query = query.sort('createdAt');
  // }

  // // 3) Field Limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  // } else {
  //   // query = query.select('-__v'); // exclude 'v' field
  // }

  // // 4) Pagination
  // const page = req.query.page * 1 || 1; // default page
  // const limit = req.query.limit * 1 || 100; // default limit
  // // limit=10 1-10 page1, 11-20 page2, 21-30 page3
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);
  // if (req.query.page) {
  //   const numTour = await Tour.countDocuments();
  //   console.log(skip);
  //   if (skip >= numTour) {
  //     throw new Error('This page does not exsits');
  //   }
  // }

  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  // // sol2:
  // const tours = await Tour.find()
  //   .where('duration')
  //   .equals(5)
  //   .where('difficulty')
  //   .equals('easy');

  res.status(200).json({
    status: 'success',
    // requestTime: req.requestTime,
    results: tours.length,
    // envelope for the data
    data: {
      // tours: tours, // name of the resource
      tours,
    },
  });
});

// exports.getTour = catchAsync(async (req, res) => {
//   const tour = await Tour.findById(req.params.id);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: tour,
//     },
//   });

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    // null
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

  // removed after we have checkID function (no longer in use)
  // convert a string to a number
  // const id = req.params.id * 1;
  // sol2:
  // const tour = tours.find((el) => el.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     massage: 'Ivalid Id',
  //   });
  // }

  // // sol1: check the id is valid
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     massage: 'Ivalid Id',
  //   });
  // }
  // // return the exact match
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //    tour: tour,
  //   },
  // });
});

/**
 * POST
 * create a new tour
 */
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

// // console.log(req.body);

// const newId = tours[tours.length - 1].id + 1;
// // create a new obj by merging the two exsiting objs
// const newTour = Object.assign({ id: newId }, req.body);

// tours.push(newTour);
// // we are inside of a call-back func that is gonna run
// // in an event loop, can never block it, so can never use writeFileSync
// fs.writeFile(
//   `${__dirname}/dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   }
// );

/**
 * PATCH
 * update a tour by id
 */
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    // null
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      // tour: '<Update tour here>',
      tour,
    },
  });
});

/**
 * DELETE
 */
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        // _id: { $toUpper: '$difficulty' },
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0, // not show the id
      },
    },
    {
      $sort: { numTourStarts: -1 }, // descending a
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
