const Joi = require("joi");

const CoworkerSchema = Joi.object({
  lastName: Joi.string()
    .min(1)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z'-]+$/)
    .required(),
  roomNumber: Joi.integer().min(1).max(9999).required(),
  department: Joi.string().min(1).trim().allow(null),
  computerType: Joi.string()
    .min(1)
    .valid("desktop", "laptop", "tablet", null)
    .trim()
    .allow(null),
});

const CoworkerCreateSchema = Joi.alternatives().try(
  CoworkerSchema,
  Joi.array()
    .items(CoworkerSchema)
    .min(1)
    .unique(
      (a, b) => a.lastName === b.lastName && a.roomNumber === b.roomNumber
    )
);

const CoworkerUpdateSchema = Joi.object({
  lastName: Joi.string()
    .min(1)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z'-]+$/),
  roomNumber: Joi.number().integer().min(1).max(9999),
  department: Joi.string().min(1).trim().allow(null),
  computerType: Joi.string()
    .min(1)
    .max(50)
    .trim()
    .valid("desktop", "laptop", "tablet", null)
    .allow(null),
})
  .min(1)
  .oxor("lastName", "roomNumber")
  .messages({
    "object.oxor": "Cannot update both lastName and roomNumber simultaneously",
  });

module.exports = { CoworkerCreateSchema, CoworkerUpdateSchema };
