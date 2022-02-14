const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    studname:{
        type:String,
        required:true
    },
    rollno: {
        type:String,
        required:true
    }
})


// create collection

const Register = new mongoose.model("Resgister",studentSchema );

module.exports=Register;