const mongoose = require('mongoose');

const { Schema } = mongoose;

const sandwichSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  toppings: {
    type: Array,
    required: true,
  },
  'toppings.$': {
    type: String,
    required: true,
  },
  breadType: {
    type: String,
    required: true,
  },
});

const Sandwich = mongoose.model('Sandwich', sandwichSchema);
module.exports = Sandwich;
