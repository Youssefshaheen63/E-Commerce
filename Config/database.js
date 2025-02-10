const mongoose = require("mongoose");

const DBConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`DataBase Connected ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`DataBase Connection Failed ${err}`);
    });
};

module.exports = DBConnection;
