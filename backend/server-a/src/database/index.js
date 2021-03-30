const mongoose = require('mongoose');
const Order = require('./order.model');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connectDb = mongoose.connection;

const models = {
  Order,
};

module.exports = { connectDb, models };
