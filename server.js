const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({
  path: 'config.env',
});
const DBConnection = require('./Config/database');
const categoryRoute = require('./Routes/categoryRoutes');

// DB connection
DBConnection();

// express App
const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // http request logger
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);

app.get('/', (req, res) => {
  res.send('Our API V1');
});

// Server
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});
