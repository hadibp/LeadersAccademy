var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Register } = require("../config/registers");
const { registerValidation, loginValidation } = require("../config/validation");
const cookieparser = require("cookie-parser");

router.use(cookieparser());

var maxAge = 3 * 24 * 60 * 60;
//   create and assign token

router.get("/register", (req, res) => {
  res.render("admin/signup");
});

router.post("/register", async (req, res) => {
  // validate before sends DB
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  // cheacking if the email is alrady exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already Exist");
  }
  console.log(req.body);

  //HASH(encrypt) password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  try {
    const response = await User.create({
      email: req.body.email,
      password: hashedpassword,
    });
    console.log("user created successfully", response);
    res.render("admin/eventform");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/", async (req, res) => {
  // validate before sends DB
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  // cheacking if email alrady exist
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    console.log("Email is not registerd");
    return res.status(400).send("Email is not registerd");
  }

  //password cheacking
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password ");
  }

  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: maxAge,
    });
    // set cookies----------
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // res.json({status:"ok", data :token});

    Register.find(function(err,register){
      if(err){
        console.log(err);
      }else{
        res.render("admin/card",{register:register});
        // console.log(register);
      }
  })
  } catch (err) {
    console.log("erroorr");
    res.sendStatus(404);
  }
});



router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});


module.exports = router;
