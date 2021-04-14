const bcrypt = require('bcrypt');
const pick = require('lodash.pick');
const User = require('../../database/user.model');
const { created, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const cipheredPassword = await bcrypt.hash(password, 10);
      const userCount = await User.count({});
      const newUser = new User({
        username,
        password: cipheredPassword,
        isAdmin: userCount === 0,
      });
      await newUser.save();
      const newUserCallback = pick(newUser, ['username', 'isAdmin', '_id']);
      return created(res, newUserCallback);
    } catch (error) {
      if (error.code === 11000) {
        error.message = errors.usernameAlreadyExists;
      }
      return next(error);
    }
  },
];
