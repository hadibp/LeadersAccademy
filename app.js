const express = require('express')
const app=express()
var path = require('path');


app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use('/public',express.static('public'));


app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/nav',(req,res)=>{
    res.render('partials/logindashbord');
})

app.listen(4000,()=>{
    console.log("website is running");
})