import Joi from 'joi';

export default Joi.object({
  value: Joi.any().required(),
  description: Joi.string(),
  url: Joi.string(),
});
