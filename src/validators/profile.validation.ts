import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  avatar: Joi.string().optional()
});