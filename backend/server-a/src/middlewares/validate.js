const { badRequest, errors } = require('../utils/responses');

module.exports.validateBody = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return badRequest(res, errors.requiredValuesMissing);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports.validateParams = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.params);
    if (error) {
      return badRequest(res, errors.invalidId);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
