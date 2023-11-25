const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicatedFieldsDB = (err) => {
  const { email } = err.keyValue;
  const message = `Duplicate field value: ${email}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token! Please log in again.', 401);
const handleJWTExpiredError = () => new AppError('Expired token! Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    stack: err.stack,
    status: err.status,
    message: err.message,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error!',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'MongoServerError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicatedFieldsDB(error);
    if (error._message === 'User validation failed') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
