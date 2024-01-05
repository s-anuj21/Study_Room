const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDB = () => {
  // Connecting Database
  const DB = process.env.DATABASE;

  // Making strictQuery of monooose false, it is true by default
  // This option allows is to save fields which is not even specified in the schema model
  mongoose.set('strictQuery', true);

  mongoose
    .connect(DB, {
      dbName: 'mainApp',
    })
    .then(() => {
      console.log('DB connection successful!');
    })
    .catch((err) => {
      console.log('Failed to Connect to DB', err);
    });
};

module.exports = { connectDB };
