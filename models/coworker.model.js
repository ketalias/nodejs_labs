const { Schema, model } = require("mongoose");

const coworkerSchema = new Schema(
  {
    lastName: {
      type: String,
      trim: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      trim: true,
    },
    computerType: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('coworker', coworkerSchema);
