const pick = require('lodash.pick');
const User = require('../../database/user.model');
const { ok, notFound, forbidden, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      const requestingUserId = req.user._id;
      if (userId !== requestingUserId) {
        const user = await User.findOne({ _id: userId });
        if (!user) {
          return notFound(res, errors.userNotFound);
        }
        user.isAdmin = !user.isAdmin;
        await User.updateOne({ _id: userId }, user);
        const userCallback = pick(user, ['username', 'isAdmin', '_id']);
        return ok(res, userCallback);
      }
      return forbidden(res, errors.cannotSetSelfAsAdmin);
    } catch (error) {
      return next(error);
    }
  },
];
