const Sandwich = require('../../database/sandwich.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { id: sandwichId } = req.params;
      const sandwich = await Sandwich.deleteOne({ _id: sandwichId });
      if (sandwich.deletedCount === 0) {
        return notFound(res, errors.userNotFound);
      }
      return ok(res, sandwich);
    } catch (error) {
      return next(error);
    }
  },
];
