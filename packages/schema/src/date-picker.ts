import Joi from 'joi';

export default Joi.object({
  action_id: Joi.string().required(),
  placeholder: Joi.string(),
  initialDate: Joi.string(),
});
