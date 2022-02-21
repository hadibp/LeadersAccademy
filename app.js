const express = require("express");
const app = express();
var path = require("path");

// database connection
require("./config/connection");

// routes

var adminRouter = require("./routes/Admin");
var studentRouter = require("./routes/student");
var publicRouter = require("./routes/public");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));

//

app.get("/nav", (req, res) => {
  console.log("welocome");
  res.render("partials/navbar");
});

app.get("/footer", (req, res) => {
  res.render("partials/footer");
});

app.get("/login-modal", (req, res) => {
  res.render("partials/login-modal");
});

app.get("/library-modal", (req, res) => {
  res.render("partials/library-modal");
});

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.render("home");
// });

// router
app.use("/", adminRouter);
app.use("/admin", adminRouter);

// create a new user in database

app.listen(4000, () => {
  console.log("website is running");
});
