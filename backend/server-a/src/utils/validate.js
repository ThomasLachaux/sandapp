const Joi = require('joi');

module.exports.UserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.OrderSchema = Joi.object({
  content: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
    )
    .min(1)
    .required(),
});

module.exports.SandwichSchema = Joi.object({
  name: Joi.string().required(),
  toppings: Joi.array().items(Joi.string()).required(),
  breadType: Joi.string().required(),
});

module.exports.IdSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
