const User = require('../database/user.model');
const { unauthorized, errors } = require('../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { isAdmin } = req.user;
      if (user.isAdmin) {
        next();
      } else {
        return forbidden(res, errors.forbiddenAccess);
      }
    } catch (error) {
      return next(error);
    }
  },
];
