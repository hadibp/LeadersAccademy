require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ONLINE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((e)=>{
    console.log("DB connection successfull "+e);
}).catch((e)=>{
    console.log("DB not connected becuse "+e);
});

