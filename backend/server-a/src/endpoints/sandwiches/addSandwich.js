const Sandwich = require('../../database/sandwich.model');

module.exports = [
  async (req, res, next) => {
    try {
      // TODO: restrict access to admins
      const { name, toppings, breadType } = req.body;
      // TODO: add Joi validation
      const newSandwich = new Sandwich({
        name,
        toppings,
        breadType,
      });
      await newSandwich.save();
      return res.status(201).json(newSandwich);
    } catch (error) {
      return next(error);
    }
  },
];
