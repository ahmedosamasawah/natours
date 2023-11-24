const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('Error:', err.name, err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to Database!'));

const server = app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is listening on port:${process.env.PORT || 8000}...`),
);

process.on('unhandledRejection', (err) => {
  console.log('Error:', err.name, err.message);
  server.close(() => process.exit(1));
});
