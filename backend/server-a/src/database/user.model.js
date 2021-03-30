const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    required: true,
    default: [],
  },
  'orders.$': {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
