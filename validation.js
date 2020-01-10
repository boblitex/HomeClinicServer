const Joi = require("@hapi/joi");

const validate =  data => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    idno: Joi.string().min(5),
    password: Joi.string().min(6)
  });
  
  return schema.validate(data);

 
};

const loginValidate = data => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
  });

  return schema.validate(data);
};

module.exports = {
  validate,
  loginValidate
};
