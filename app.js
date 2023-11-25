const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const express = require('express');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const mongoSanitize = require('express-mongo-sanitize');

const errorGlobalHandler = require('./controllers/errorController');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! please try again in an hour.',
});

const app = express();

app.use(xss());
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => next(new AppError(`Cant find ${req.originalUrl} in this server!`, 404)));
app.use(errorGlobalHandler);

module.exports = app;
