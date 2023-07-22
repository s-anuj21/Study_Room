const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Running browser auto
// const open = require('open');
// open('http://localhost:4000/');

dotenv.config({ path: './config.env' });

const server = require('./index');
// This file is the entry point for the program, and the contents it contain is solely related to server.

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
  });

const port = process.env.PORT || 4000;

// server.listen(port, (req, res) => {
//   console.log(`Running Server on port ${port}`);
// });
