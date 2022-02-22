var express = require("express");
var router = express.Router();
const { Register, Auth, Book, Event}= require("../public/javascript/registers");
const multer = require("multer");



// define storage for the images
const storage = multer.diskStorage({
  // destination for file
  destination:function(req,file,callback){
    callback(null, './public/images/profileimages');
  },

  // add backthe extenstion
  filename:function(req,file,callback){
    callback(null , Date.now() + file.originalname)
  },
});

// upload parameter
const upload = multer({
  storage:storage,
  limits:{
    limits:{
      fieldSize:1024*1024*8
    },
  },
})

// Home page
router.get("/", (req, res) => {
  res.render("home");
});
router.post("/", async(req, res) => {
  console.log(req.params);
    var auth = new Auth({
    username:req.body.username,
    password:req.body.password
  });
  auth.save();
  res.render("home");
});

router.get("/card", (req, res) => {
  Register.find(function(err,register){
      if(err){
        console.log(err);
      }else{
        res.render("admin/card",{register:register});
        console.log(register);
      }
  })
});


// Admission page
router.get("/admin", (req, res) => {
  res.render("admin/admission");
});
router.get("/profile/:id", (req, res) => {
  console.log(req.params.id);
  res.send("the parameter is " + req.params.id)
  // res.render("admin/admission");
});

router.get("/bform", (req, res) => {
  res.render("admin/bookform");
});
router.post("/bform", (req, res) => {
  console.log(req.body);
  res.render("admin/bookform");
});
router.get("/eform", (req, res) => {
  res.render("admin/eventform");
});

router.post("/admin",upload.single('Image'), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var register = new Register({
    studname: req.body.studname,
    rollno: req.body.rollno,
    batch: req.body.batch,
    program: req.body.program,
    dob: req.body.dob,
    bloodgroup: req.body.bloodgroup,
    health: req.body.health,
    mob: req.body.mob,
    email: req.body.email,
    permaddress: req.body.permaddress,
    permcontact: req.body.permcontact,
    localaddress: req.body.localaddress,
    localcontact: req.body.localcontact,
    admissionno: req.body.admissionno,
    gm: req.body.gm,
    sc: req.body.sc,
    st: req.body.st,
    mq: req.body.mq,
    proposer: req.body.proposer,
    prevcourse: req.body.prevcourse,
    institute: req.body.institute,
    mark: req.body.mark,
    fathername: req.body.fathername,
    fatheroccupation: req.body.fatheroccupation,
    fathercontact: req.body.fathercontact,
    mothername: req.body.mothername,
    mothersoccupation: req.body.mothersoccupation,
    motherscontact: req.body.motherscontact,
    gurdiansname: req.body.gurdiansname,
    gurdiansoccupation: req.body.gurdiansoccupation,
    gurdianscontact: req.body.gurdianscontact,
    relativename: req.body.relativename,
    relativeprogram: req.body.relativeprogram,
    relativeyear: req.body.relativeyear,
    img:req.file.filename,
  });

  try{
    register.save();
    res.render("admin/admission");
  } catch(error){
    console.log(error);
  }
});

router.get("/events",(req,res)=>{
  res.render("admin/ldgevents");
})
router.get("/library",(req,res)=>{
  res.render("admin/library");
})

router.get("/all",(req,res)=>{
  Register.find().then((result)=>{
    res.send(result)
  }).catch((err)=>{
    console.log(err);
  });
})
module.exports = router;
