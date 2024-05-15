const multer = require('multer');
const jimp = require('jimp');

const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

/*
 * Photo Upload - multer middleware
 */
// const multerStorage = multer.diskStorage({
//   // NOT simply a file path, but utilising a callback function
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user-userId-timestamp.jpeg
//     const ext = file.mimetype.split('/')[1]; // get extension of the file
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // To accept the file pass 'true'
  } else {
    cb(
      new AppError(
        'The file selected is not an image, please upload only image',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('photo');
exports.uploadUserPhoto = upload;

// Resize Photo
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const image = await jimp.read(req.file.buffer); // Read image buffer with jimp
    await image.resize(500, 500);
    await image.quality(90);
    const filename = `user-${req.user._id}-${Date.now()}.jpg`;
    await image.writeAsync(`public/img/users/${filename}`);
    req.file.filename = filename;
    next();
  } catch (err) {
    return next(new AppError('Error resizing image', 400));
  }
});

// Check for allowed objects
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/**
 * Handlers for current logged in user
 */
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields that are not allowed to be updated
  // In this case, only allow to update "name" and "email"
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // We are not deleting the user from the db, just making them inactive
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/**
 * Handlers for admin manipulating user
 */
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User); // DO NOT change pwd
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

/**
 * Get user's bookings/reviews
 */
exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  console.log(tours);

  if (!tours) {
    return next(new AppError('No booked tours found with this user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const reviews = await Review.find({ user: req.user.id });
  console.log(reviews);

  // 2) Find tours with the returned IDs
  // const tourIDs = bookings.map((el) => el.tour);
  // const tours = await Tour.find({ _id: { $in: tourIDs } });

  if (!reviews) {
    return next(new AppError('No booked tours found with this user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});
