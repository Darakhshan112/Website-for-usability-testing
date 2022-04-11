const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
   firstname: {
        type: String,
        required:true,
        trim: true
    },
    lastname: {
        type: String,
        required:true,
        trim: true
    }
   

})

const Student= new mongoose.model("Student",employeeSchema)
module.exports=Student