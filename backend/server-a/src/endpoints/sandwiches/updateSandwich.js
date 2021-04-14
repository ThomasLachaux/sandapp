const Sandwich = require('../../database/sandwich.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { id: sandwichId } = req.params;
      const { name, toppings, breadType } = req.body;

      const response = await Sandwich.updateOne({ _id: sandwichId }, { $set: { name, toppings, breadType } });
      if (response.modifiedCount === 0) {
        return notFound(res, errors.sandwichNotFound);
      }
      return ok(res, response);
    } catch (error) {
      return next(error);
    }
  },
];
