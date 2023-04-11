import Joi from "joi";

export const categoryValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
});
