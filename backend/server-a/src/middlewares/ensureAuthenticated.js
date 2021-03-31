const jwt = require('jsonwebtoken');
const { unauthorized, errors } = require('../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const jwtToken = authHeader.split(' ')[1];
        jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return unauthorized(res, errors.authenticationError);
            }
            const checkedUser = await User.findOne({ _id: userId });
            if (!checkedUser) {
              return unauthorized(res, errors.authenticationError);
            }
            req.user = checkedUser;
            next();
        });
      } else {
        return unauthorized(res, errors.authenticationError);
      }
    } catch (error) {
      return next(error);
    }
  },
];
