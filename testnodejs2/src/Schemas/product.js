import Joi from "joi";

export const productValidate = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number(),
  des: Joi.string(),
  categoryId: Joi.string().required(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});
