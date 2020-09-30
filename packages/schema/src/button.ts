import Joi from 'joi';

export default Joi.object({
  actionId: Joi.string().required(),
  value: Joi.any().required(),
  url: Joi.string(),
  style: Joi.string(),
});
