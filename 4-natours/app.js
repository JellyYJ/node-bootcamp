const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// require the routes we defined
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

/**
 * Global Middleware
 */
// Set security HTTP headers
app.use(helmet());

// only happen when the app is in development
if (process.env.NODE_ENV === 'development') {
  // logger middleware
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // an hour
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json());

// Data sanitisation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitisation against malicious HTML input
app.use(xss());

// Prevent parameter pollution(should be used at the end, since it is for cleairng the query)
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Serve static files from the 'public' directory located in the same directory as this server file.
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

// Just for showing the importance of next()
// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   // if don't call next func, the cycle will be stuck, can never get the response
//   next();
// });

/**
 * Routes
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
