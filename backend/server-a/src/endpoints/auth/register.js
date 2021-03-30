const bcrypt = require('bcrypt');
const pick = require('lodash.pick');
const User = require('../../database/user.model');
const { created } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // TODO: add Joi validation
      const cipheredPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: cipheredPassword,
        orders: [],
        isAdmin: false,
      });
      await newUser.save();
      const newUserCallback = pick(newUser, ['username', 'orders', 'isAdmin', '_id']);
      return created(res, newUserCallback);
    } catch (error) {
      // TODO: 409 handler for non-unicity
      return next(error);
    }
  },
];
