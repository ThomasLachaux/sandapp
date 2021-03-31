const Sandwich = require('../../database/sandwich.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { sandwichId } = req.params;
      // TODO: add Joi validation
      const sandwich = await Sandwich.deleteOne({ _id: sandwichId });
      if (sandwich.deletedCount === 0) {
        return notFound(res, errors.userNotFound);
      }
      return ok(res, user);
    } catch (error) {
      return next(error);
    }
  },
];
