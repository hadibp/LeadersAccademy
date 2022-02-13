const express = require('express')
const app=express()
var path = require('path');


// database connection
var db=require('./config/connection')



// routes

var adminRouter = require('./routes/admin');
var studentRouter = require('./routes/student');
var publicRouter = require('./routes/public');



app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use('/public',express.static('public'));

// connection establish
// db.connect((err)=>{
//     if(err)console.log("connection error"+err);
//     else console.log("Database connected to mongo");
//   });


app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/nav',(req,res)=>{
    res.render('partials/navbar');
})
app.get('/footer',(req,res)=>{
    res.render('partials/footer')
})
app.get('/login-modal',(req,res)=>{
    res.render('partials/login-modal')
})
app.get('/library-modal',(req,res)=>{
    res.render('partials/library-modal')
})
app.listen(4000,()=>{
    console.log("website is running");
})