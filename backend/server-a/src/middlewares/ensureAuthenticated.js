const jwt = require('jsonwebtoken');
const User = require('../database/user.model');
const { unauthorized, errors } = require('../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const jwtToken = authHeader.split(' ')[1];
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET);

        const checkedUser = await User.findOne({ _id: user.userId });
        if (!checkedUser) {
          return unauthorized(res, errors.authenticationError);
        }
        req.user = checkedUser;

        return next();
      } else {
        return unauthorized(res, errors.authenticationError);
      }
    } catch (error) {
      return next(errors.authenticationError);
    }
  },
];
