const Joi = require('joi');

const authSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.number().required(),
});

module.exports = authSchema;