const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckOutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // GET FRONTEND host
  const frontendHost = req.query.frontendHost;

  // 2) Create checout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${frontendHost}`,
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${frontendHost}/tours/${tour.id}`,
    // cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    mode: 'payment',

    // details about the tour(product)
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
        quantity: 1,
      },
    ],
  });

  // 3) Create booking (added after Frontend)
  await Booking.create({
    tour: req.params.tourId,
    user: req.user.id,
    price: tour.price,
  });

  // 4) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// Create a new booking in the database
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // THIS IS ONLY TEMP, UNSECURE: everyone can book without paying by visiting the success_url
  const { tour, user, price } = req.query; // the query:success_url

  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]); // root url: ${req.protocol}://${req.get('host')}
});

exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
