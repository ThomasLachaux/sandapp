const Sandwich = require('../../database/sandwich.model');
const { created } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { name, toppings, breadType } = req.body;
      // TODO: add Joi validation
      const newSandwich = new Sandwich({
        name,
        toppings,
        breadType,
      });
      await newSandwich.save();
      return created(res, newSandwich);
    } catch (error) {
      return next(error);
    }
  },
];
