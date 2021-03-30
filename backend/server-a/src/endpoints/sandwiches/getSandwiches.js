const Sandwich = require('../../database/sandwich.model');

module.exports = [
  async (req, res, next) => {
    try {
      const sandwiches = await Sandwich.find({});
      return res.status(200).json(sandwiches);
    } catch (error) {
      return next(error);
    }
  },
];
