const jwt = require("jsonwebtoken");
const { User }= require("./registers");

const verify = function (req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Acees Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("invalid Token");
  }

};

const checkuser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken);
          let user = await User.findById(decodedToken._id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  module.exports = {checkuser,verify}