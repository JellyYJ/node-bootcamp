/**
 * This file only runs once for importing the data to the db at the beginning.
 */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// Connect to our DB
const DB = process.env.DATABASE_HOST.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB = process.env.DATABSE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections); // for testing
    console.log('DB connetion successful');
  });

// Read JSON file
// need to use the below path instead of:'./tours-simple.json' or 'tours-simple.json'
const tours = JSON.parse(
  // fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);
// console.log(tours); // test if the file is read

// Import data into DB
const importData = async () => {
  try {
    // .create accepts an array of JavaScript objects
    await Tour.create(tours);
    console.log('Data imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    // .create accpects an array of javaScript objects
    await Tour.deleteMany();
    console.log('Data deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// console.log(process.argv);
if (process.argv[2] === 'import') {
  importData();
} else if (process.argv[2] === 'delete') {
  deleteData();
}
