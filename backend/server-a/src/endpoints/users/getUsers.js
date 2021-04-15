const User = require('../../database/user.model');
const { ok } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const users = await User.find({}).select('_id username isAdmin').sort({ username: 'asc' });
      return ok(res, users);
    } catch (error) {
      return next(error);
    }
  },
];
