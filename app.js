const express = require('express')
const app=express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(3000,()=>{
    console.log("website is running");
})