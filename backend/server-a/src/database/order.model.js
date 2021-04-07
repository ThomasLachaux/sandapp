const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  displayId: {
    type: String,
    required: true,
  },
  madeBy: {
    type: String,
    required: true,
    default: 'dev',
  },
  status: {
    type: String,
    enum: ['ordered', 'received', 'inQueue', 'ready', 'failed'],
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  'content.$': {
    type: Object,
    required: true,
  },
  'content.$.name': {
    type: String,
    required: true,
  },
  'content.$.quantity': {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
