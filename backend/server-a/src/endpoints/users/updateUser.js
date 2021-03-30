const bcrypt = require('bcrypt');
const pick = require('lodash.pick');
const User = require('../../database/user.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { username, password } = req.body;
      // TODO: add Joi validation
      let response = {};
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return notFound(res, errors.userNotFound);
      }
      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
      }
      if (username) {
        user.username = username;
      }
      await User.updateOne({ _id: userId }, user);
      const userCallback = pick(user, ['username', 'orders', 'isAdmin', '_id']);
      return ok(res, userCallback);
    } catch (error) {
      return next(error);
    }
  },
];
