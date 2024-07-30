const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/backend');
    console.log('Success to connect db!');
  } catch (e) {
    console.log('Failure to connect db!');
  }
}

module.exports = { connect };
