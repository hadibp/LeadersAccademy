const express = require("express");
const app = express();
var path = require("path");

// database connection
require("./config/connection");
const Register = require("./public/javascript/registers");

// routes

var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/student");
var publicRouter = require("./routes/public");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/nav", (req, res) => {
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

app.get("/admin", (req, res) => {
  res.render("partials/admission");
});

// create a new user in database
app.post("/admin", async (req, res) => {
  try {


  } catch (e) {
    res.status(404).send(e);
  }

  res.render("home");
  console.log(req.body);
});

app.listen(4000, () => {
  console.log("website is running");
});
