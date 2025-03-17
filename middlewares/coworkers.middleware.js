const createError = require("http-errors");
const {
  CoworkerCreateSchema,
  CoworkerUpdateSchema,
} = require("../joi_validation_schemas/coworkers.schemas");

const coworkerCreationDataValidation = async (req, res, next) => {
  try {
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
