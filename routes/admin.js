var express = require("express");
var router = express.Router();
const { Register, User, Book, Event}= require("../public/javascript/registers");
const multer = require("multer");
const authRoute = require('./authRoutes')


// define storage for the images
const profileimagestorage = multer.diskStorage({
  // destination for file
  destination:function(req,file,callback){
    callback(null, './public/images/profileimages');
  },
  // add backthe extenstion
  filename:function (req,file,callback) {
    callback(null , Date.now() + file.originalname)
  }
});
// upload parameter
const profileupload = multer({
  storage:profileimagestorage,
  limits:{
    limits:{
      fieldSize:1024*1024*8
    },
  },
})
const eventimagestorage = multer.diskStorage({
  // destination for file
  destination:function(req,file,callback){
    callback(null, './public/images/eventimages');
  },
  // add backthe extenstion
  filename:function(req,file,callback){
    callback(null , Date.now() + file.originalname)
  },
});


// upload parameter
const eventupload = multer({
  storage:eventimagestorage,
  limits:{
    limits:{
      fieldSize:1024*1024*8
    },
  },
})



// ....................routes................. //

// auth page
router.use(authRoute)

// Home page
router.get("/", (req, res) => {
  res.render("home");
});

router.post("/", async(req, res) => {
  console.log(req.params);
    var user = new User({
    email:req.body.email,
    password:req.body.password
  });
  user.save();
  // const {email, password } = req.body;
  // try {
    
  // } catch (err) {
  //   console.log("thiss is an error");
  // }

  res.render("home");
  
});


// Admission page
// students details pages
router.get("/admin", (req, res) => {
  res.render("admin/admission");
});

router.post("/admin", profileupload.single('Image'), async (req, res) => {
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
    admissionstatus:req.body.status,
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


// dispaly student page
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

// library page
router.get("/library",(req,res)=>{
  res.render("admin/library");
})
// library adding pages
router.get("/lform", (req, res) => {
  res.render("admin/bookform");
});
router.post("/lform", (req, res) => {
  console.log(req.body);
  res.render("admin/library");
});


// LDGevnt pages
router.get("/events",(req,res)=>{
  Event.find(function(err,eventdata){
    if(err){
      console.log(err);
    }else{
      res.render("admin/ldgevents",{eventdata});
    }
  })
});

// event form 
router.get("/eform", (req, res) => {
  res.render("admin/eventform");
});

router.post("/eform",eventupload.single('event'), async(req,res)=>{
  var event = new Event({
    edate:req.body.edate,
    etime:req.body.etime,
    eplatform:req.body.eplatform,
    ecategory:req.body.ecategory,
    event:req.file.filename
  });
  try {
    event.save();
    res.redirect("events");
  } catch (error) {
    console.log(error);
  }
})

// profile card
router.get("/profile", (req, res) => {
  res.render("admin/stdprofile");
});

router.get("/all",(req,res)=>{
  Register.find().then((result)=>{
    res.send(result)
  }).catch((err)=>{
    console.log(err);
  });
})
module.exports = router;
