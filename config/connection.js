require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://hadi7653:${process.env.DB_PASS}@cluster0.zhsny.mongodb.net/leaders`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((e)=>{
    console.log("DB connection successfull "+e);
}).catch((e)=>{
    console.log("DB not connected becuse "+e);
});

