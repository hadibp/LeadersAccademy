const mongo = require("../public/javascript/registers");
const jwt = require('jsonwebtoken');

// handle Errors
const handleErrors = (err)=>{
    console.log(err.message , err.code);
    // let errors ={ email = '' , password = ''}

    if (err.code === 11000){
        errors.email = 'that email is already registered '
        return errors;
    }

    //validation error
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            console.log(properties);
            errors[properties.path]= properties.message;
        }); 
    };
    return errors;
}

const maxAge = 3 * 24 * 60 * 60; 
// creating a web token
const createToken = (id)=>{
  return jwt.sign({id}, 'leaders accademy' , {expiresIn : maxAge});

}

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
    var user = new mongo.User({
      email: req.body.email,
      password: req.body.password,
    });
    user.save();
    const token = createToken(user._id)
    res.cookie('jwt' , token ,{ httpOnly: true, maxAge : maxAge * 1000})
    res.status(201).json({user : user._id});
  } 
  catch (err) {
    const errors = handleErrors(err); 
    res.status(400).json({errors});
  }
};

module.exports.login_post = async (req, res) => {
  res.render("admin/signup");
};
