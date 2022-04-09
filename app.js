const express = require("express");
const app = express();
const port = 4000;
var path = require("path");
const authRoute = require('./routes/authRoutes');
const cookieparser = require('cookie-parser');

// routes
var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/student");
var publicRouter = require("./routes/public");

// database connection
require("./config/connection");
require("dotenv").config();

console.log(process.env);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));
app.use(cookieparser());


app.use(authRoute);

// cookies
// app.get('/set-cookies',(req,res)=>{
//   // res.setHeader('Set-Cookies','newUser=true');
//   res.cookie('newUser',false);
//   res.cookie('isEmployee',true , {maxAge: 1000 * 60 * 60 *24 });
//   res.send("got the cookies")
// })
// app.get('/read-cookies',(req,res)=>{
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies)
// })

// router
app.use("/", adminRouter);
app.use("/admin", adminRouter);

// create a new user in database
app.listen(process.env.PORT || port, () => {
  console.log(`website is running : ${port}`);
});
