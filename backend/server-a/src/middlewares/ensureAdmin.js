const { forbidden, errors } = require('../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { isAdmin } = req.user;
      if (isAdmin) {
        return next();
      }
      return forbidden(res, errors.forbiddenAccess);
    } catch (error) {
      return next(error);
    }
  },
];
