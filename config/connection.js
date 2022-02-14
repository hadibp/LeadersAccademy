const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/leaders",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection successfull"+e);
}).catch((e)=>{
    console.log("not connected becuse "+e);
});