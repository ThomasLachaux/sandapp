const pick = require('lodash.pick');
const User = require('../../database/user.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const user = await User.findOne({ _id });
      if (!user) {
        return notFound(res, errors.userNotFound);
      }
      const userCallback = pick(user, ['username', 'isAdmin', '_id']);
      return ok(res, userCallback);
    } catch (error) {
      return next(error);
    }
  },
];
