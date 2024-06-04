const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// require the routes we defined
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

app.use(
  cors({
    origin: [
      'https://natours.com',
      'http://localhost:5173', // Local development
      'https://natoursmern.netlify.app', // Deployed frontend
    ],
    credentials: true,
  })
);
app.options('*', cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // node will automatically create the correct path

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

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// Cookie parser
app.use(cookieParser());

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

// Compress all the texts sending to the client
app.use(compression());

// Serve static files from the 'public' directory located in the same directory as this server file.
app.use(express.static(`${__dirname}/public`));

// TEST MIDDLEWARE
app.use((req, res, next) => {
  // console.log('Hello from the middleware');
  req.requestTime = new Date().toISOString();
  // if don't call next func, the cycle will be stuck, can never get the response
  next();
});

/**
 * Routes
 */
app.use('/', viewRouter);
// app.get('/', (req, res) => res.send('Server working!'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.use('/img/users', express.static(path.join('public/img/users')));

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
