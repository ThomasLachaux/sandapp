const Sandwich = require('../../database/sandwich.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { sandwichId } = req.params;
      const sandwich = await Sandwich.findOne({ _id: sandwichId });
      if (!sandwich) {
        return notFound(res, errors.sandwichNotFound);
      }
      return ok(res, sandwich);
    } catch (error) {
      return next(error);
    }
  },
];
