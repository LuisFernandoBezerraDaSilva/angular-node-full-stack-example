const Joi = require('joi');

const valueSchema = Joi.object({
  month: Joi.string().required(),
  value: Joi.number().required(),
  userId: Joi.number().required(),
});

module.exports = valueSchema;