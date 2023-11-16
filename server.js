const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to Database!'));

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is listening on port:${process.env.PORT || 8000}...`),
);
