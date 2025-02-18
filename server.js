const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({
  path: 'config.env',
});
const ApiError = require('./utils/apiError');
const errorMiddleware = require('./Middlewares/errorMiddleware');
const DBConnection = require('./Config/database');
const categoryRoute = require('./Routes/categoryRoutes');

// DB connection
DBConnection();

// express App
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev')); // http request logger
console.log(`mode: ${process.env.NODE_ENV}`);

// Mount Routes
app.use('/api/v1/categories', categoryRoute);

// handle undefined routes
app.all('*', (req, res, next) => {
  // err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // next(err.message);

  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 400));
});

// Global Error Handler for express
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Our API V1');
});

// Server
const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});

// handle Errors outside express eg: DataBase
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection   ${err.name} | ${err.message}`);
  // if there is pendding requstes close server first before exit process
  server.close(() => {
    console.log('Shuting down...');
    process.exit(1);
  });
});
