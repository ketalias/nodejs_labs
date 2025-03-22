const Joi = require("joi");

const CoworkerSchema = Joi.object({
  lastName: Joi.string().min(1).trim().required(),
  roomNumber: Joi.number().required(),
  department: Joi.string().min(1).trim().allow(null),
  computerType: Joi.string().min(1).trim().allow(null),
});

const CoworkerCreateSchema = Joi.alternatives().try(
  CoworkerSchema,
  Joi.array().items(CoworkerSchema).min(1)
);

const CoworkerUpdateSchema = Joi.object({
  lastName: Joi.string().min(1).trim(),
  roomNumber: Joi.number(),
  department: Joi.string().min(1).trim().allow(null),
  computerType: Joi.string().min(1).trim().allow(null),
}).min(1);

module.exports = { CoworkerCreateSchema, CoworkerUpdateSchema };