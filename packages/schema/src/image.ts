import Joi from 'joi';

export default Joi.object({
  src: Joi.string().required(),
  alt: Joi.string().required(),
});
