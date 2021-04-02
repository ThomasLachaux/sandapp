const User = require('../../database/user.model');
const { ok, notFound, forbidden, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const requestingUserId = req.user._id;
      // TODO: add Joi validation
      if (userId !== requestingUserId) {
        const user = await User.deleteOne({ _id: userId });
        if (user.deletedCount === 0) {
          return notFound(res, errors.userNotFound);
        }
        return ok(res, user);
      }
      return forbidden(res, errors.cannotDeleteSelf);
    } catch (error) {
      return next(error);
    }
  },
];
