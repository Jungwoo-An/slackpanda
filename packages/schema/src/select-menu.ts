import Joi from 'joi';

export default Joi.object({
  actionId: Joi.string().required(),
  placeholder: Joi.string().required(),
  value: Joi.any().required(),
});
