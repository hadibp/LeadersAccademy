const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  studname: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  health: {
    type: String,
    required: true,
  },
  mob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  permaddress: {
    type: String,
    required: true,
  },
  permcontact: {
    type: String,
    required: true,
  },
  localaddress: {
    type: String,
    required: true,
  },
  localcontact: {
    type: String,
    required: true,
  },
  admissionno: {
    type: String,
    required: true,
  },
  gm: {
    type: String,
  },
  sc: {
    type: String,
  },
  st: {
    type: String,
  },
  mq: {
    type: String,
  },
  proposer: {
    type: String,
    required: true,
  },
  prevcourse: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  fatheroccupation: {
    type: String,
    required: true,
  },
  fathercontact: {
    type: String,
    required: true,
  },
  mothername: {
    type: String,
    required: true,
  },
  mothersoccupation: {
    type: String,
    required: true,
  },
  motherscontact: {
    type: String,
    required: true,
  },
  gurdiansname: {
    type: String,
    required: true,
  },
  gurdiansoccupation: {
    type: String,
    required: true,
  },
  gurdianscontact: {
    type: String,
    required: true,
  },
  relativename: {
    type: String,
    required: true,
  },
  relativeprogram: {
    type: String,
    required: true,
  },
  relativeyear: {
    type: String,
    required: true,
  },
});

// create collection

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;
