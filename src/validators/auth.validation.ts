import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required().lowercase(),
  email: Joi.string().email().required().lowercase(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().required()
});
