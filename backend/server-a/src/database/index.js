const mongoose = require('mongoose');
const Order = require('./order.model');
const Sandwich = require('./sandwich.model');
const User = require('./user.model');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connectDb = mongoose.connection;

const models = {
  Order,
  Sandwich,
  User,
};

module.exports = { connectDb, models };
