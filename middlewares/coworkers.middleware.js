const createError = require("http-errors");
const {
  CoworkerCreateSchema,
  CoworkerUpdateSchema,
} = require("../joi_validation_schemas/coworkers.schemas");

const coworkerCreationDataValidation = async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    for (const item of data) {
      if (item.roomNumber < 0) {
        throw createError.BadRequest("Room number must be a positive number");
      }
    }
    const { error } = CoworkerCreateSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }
    next();
  } catch (err) {
    next(err);
  }
};

const coworkerUpdateDataValidation = async (req, res, next) => {
  try {
    if (req.body.roomNumber !== undefined && req.body.roomNumber < 0) {
      throw createError.BadRequest("Room number must be a positive number");
    }
    const { error } = CoworkerUpdateSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  coworkerCreationDataValidation,
  coworkerUpdateDataValidation,
};