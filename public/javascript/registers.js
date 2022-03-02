const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt  = require('bcrypt')

const adminschema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "minmum password length required is 6 charachters"],
  },
});

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
    // required: true,
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
    // required: true,
  },
  permcontact: {
    type: String,
    // required: true,
  },
  localaddress: {
    type: String,
    // required: true,
  },
  localcontact: {
    type: String,
    required: true,
  },
  admissionno: {
    type: String,
    required: true,
  },
  admissionstatus: {
    type: String,
    enum: ["GM", "SC", "ST", "MQ"],
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
  img: {
    type: String,
    // required:true,
  },
});

const bookschema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  nauthor: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
    required: true,
  },
  dpublish: {
    type: String,
    required: true,
  },
  dadded: {
    type: String,
    required: true,
  },
  copies: {
    type: String,
    required: true,
  },
  bavailability: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const eventschema = new mongoose.Schema({
  edate: {
    type: String,
    required: true,
  },
  etime: {
    type: String,
    required: true,
  },
  eplatform: {
    type: String,
    required: true,
  },
  ecategory: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});


// functions to doc saved to db
// adminschema.post('save',(doc , next)=>{
//   console.log('new user was created & saved ',doc);
//   next();
// })

adminschema.pre('save', async function (next  ){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password , salt)
  console.log(('user about'));
})



// create collection

const Register = new mongoose.model("Register", studentSchema);
const User = new mongoose.model("User", adminschema);
const Book = new mongoose.model("Book", bookschema);
const Event = new mongoose.model("Event", eventschema);



module.exports = {
  Register,
  User,
  Book,
  Event,
};
