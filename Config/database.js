const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: '../../config.env' });

const DBConnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`DataBase Connected ${conn.connection.host}`);
  });
  // .catch((err) => {
  //   console.error(`DataBase Connection Failed ${err}`);
  // });
};

module.exports = DBConnection;
