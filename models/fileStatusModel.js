const mongoose = require("mongoose");
// const validator = require("mongoose-unique-validator");
const fileStatusSchema = new mongoose.Schema({
  step1: {
    filerStatus: { type: Boolean },
    role: { type: String },
    comments: [
      {
        role: { type: String },
        comment: { type: String },
        reject: { type: Boolean },
        date: { type: String },
      },
    ],
  },
  step2: {
    filerStatus: { type: Boolean },
    role: { type: String },
    comments: [
      {
        role: { type: String },
        comment: { type: String },
        reject: { type: Boolean },
        date: { type: String },
      },
    ],
  },
  step3: {
    filerStatus: { type: Boolean },
    role: { type: String },
    comments: [
      {
        role: { type: String },
        comment: { type: String },
        reject: { type: Boolean },
        date: { type: String },
      },
    ],
  },
  step4: {
    filerStatus: { type: Boolean },
    role: { type: String },
    comments: [
      {
        role: { type: String },
        comment: { type: String },
        reject: { type: Boolean },
        date: { type: String },
      },
    ],
  },
  nextRole: { type: String },
  prevComments: [
    {
      role: { type: String },
      comment: { type: String },
      reject: { type: Boolean },
      date: { type: String },
    },
  ],
  uploadedFile: { type: Object },
  markAsDone: { type: Boolean },
});
// UserSchema.plugin(validator);
module.exports = mongoose.model("efileStatus", fileStatusSchema);
