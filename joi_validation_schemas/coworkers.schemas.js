const Joi = require("joi");

const CoworkerSchema = Joi.object({
  id: Joi.string().required(),
  lastName: Joi.string().min(1).required(),
  roomNumber: Joi.string().min(1).required(),
  department: Joi.string().min(1).required(),
  computerType: Joi.string().min(1).required(),
});

const CoworkerCreateSchema = Joi.array().items(CoworkerSchema).min(1);
const CoworkerUpdateSchema = Joi.object({
  id: Joi.string().optional(),
  lastName: Joi.string().min(1).optional(),
  roomNumber: Joi.string().min(1).optional(),
  department: Joi.string().min(1).optional(),
  computerType: Joi.string().min(1).optional(),
});

module.exports = { CoworkerCreateSchema, CoworkerUpdateSchema };
