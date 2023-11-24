const morgan = require('morgan');
const express = require('express');
const AppError = require('./utils/appError');
const errorGlobalHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Cant find ${req.originalUrl} in this server!`, 404)),
);

app.use(errorGlobalHandler);

module.exports = app;
