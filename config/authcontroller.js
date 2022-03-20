const { User } = require("../public/javascript/registers");
const jwt = require("jsonwebtoken");

// handle Errors
const handleErrors = (err) => {
  console.log(err);
  // console.log(err.message , err.code);
  let errors = { email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "*This email is already registered ";
    return errors;
  }
  //validation error
  if (err.message.includes("*Useer validation failed")) {
    console.log(Object.values(err.errors));
    Object.values(err.errors).forEach(({ errors }) => {
      console.log(errors.message);
      errors.path = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
// creating a web token
const createToken = (id) => {
  return jwt.sign({ id }, "leaders accademy", { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  console.log();
  res.render("admin/signup");
};
module.exports.login_get = (req, res) => {
  res.render("admin/signup");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(user);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const {email , password} = req.body;
  try {
    const user = await User.login(email , password);
    res.status(200).json({user})
  } catch (err) {
    res.status(400).json({});
  }
};
