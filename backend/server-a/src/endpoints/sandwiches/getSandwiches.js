const Sandwich = require('../../database/sandwich.model');
const { ok } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const sandwiches = await Sandwich.find({});
      return ok(res, sandwiches);
    } catch (error) {
      return next(error);
    }
  },
];
