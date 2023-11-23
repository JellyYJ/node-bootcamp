/**
 * Everything related to express
 */
const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// require the routes we defined
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/**
 * Middleware
 */
// only happen when the app is in development
if (process.env.NODE_ENV === 'development') {
  // logger middleware
  app.use(morgan('dev'));
}

app.use(express.json());
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
