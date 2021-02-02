import Joi from 'joi';

export const commonValidation = {
  login: Joi.string().min(2),
  password: Joi.string().trim().min(8).max(60)
    .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/),
  age: Joi.number().min(4).max(130),
};

export const userCreateSchema = Joi.object({
  login: commonValidation.login.required(),
  password: commonValidation.password.required(),
  age: commonValidation.age.default(null),
});

export const userUpdateSchema = Joi.object({
  login: commonValidation.login,
  password: commonValidation.password,
  age: commonValidation.age,
});
