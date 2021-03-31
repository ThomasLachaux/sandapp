const Sandwich = require('../../database/sandwich.model');
const { ok } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { sandwichId } = req.params;
      const { name, toppings, breadType } = req.body;
      // TODO: add Joi validation
      const response = await Sandwich.updateOne(
        { _id: sandwichId },
        // eslint-disable-next-line quote-props
        { $set: { 'name': name, 'toppings': toppings, 'breadType': breadType } }, // eslint-disable-line prettier/prettier
      );
      if (!response.modifiedCount === 0) {
        return notFound(res, errors.sandwichNotFound);
      }
      return ok(res, response);
    } catch (error) {
      return next(error);
    }
  },
];
