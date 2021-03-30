const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pick = require('lodash.pick');
const User = require('../../database/user.model');
const { ok, unauthorized, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // TODO: add Joi validation
      const user = await User.findOne({ username });
      if (!user) {
        return unauthorized(res, errors.wrongCredentials);
      }
      const passwordVerification = bcrypt.compare(password, user.password);
      if (!passwordVerification) {
        return unauthorized(res, errors.wrongCredentials);
      }
      const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1y' });
      const loginCallback = pick(user, ['username', 'orders', 'isAdmin', '_id']);
      loginCallback.token = jwtToken;
      return ok(res, loginCallback);
    } catch (error) {
      return next(error);
    }
  },
];
