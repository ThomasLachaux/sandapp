const Sandwich = require('../../database/sandwich.model');

module.exports = [
  async (req, res, next) => {
    try {
      // TODO: restrict access to admins
      const { sandwichId } = req.params;
      const { name, toppings, breadType } = req.body;
      // TODO: add Joi validation
      const response = await Sandwich.updateOne(
        { _id: sandwichId },
        // eslint-disable-next-line quote-props
        { $set: { 'name': name, 'toppings': toppings, 'breadType': breadType } }, // eslint-disable-line prettier/prettier
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  },
];
