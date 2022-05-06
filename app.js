const express = require("express");
const app = express();
const port = 4000;
var path = require("path");
const authRoute = require('./routes/authRoutes');
const cookieparser = require('cookie-parser');
const {checkuser} = require('./config/verifytoken')


// routes
var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/student");
var publicRouter = require("./routes/public");

// database connection
require("./config/connection");
require("dotenv").config();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));
app.use(cookieparser());


// router
app.use("*", checkuser )
app.use("/", adminRouter);
app.use(authRoute);


// create a new user in database
app.listen(process.env.PORT || port, () => {
  console.log(`website is running : ${port}`);
});
