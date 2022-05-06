var express = require("express");
var router = express.Router();
var {verify} = require('../config/verifytoken');

router.get('/admin',verify,(req,res)=>{
    res.json({
        posts:{
            title:'my first post',
            description:"random text"
        }
    });
});




module.exports = router;