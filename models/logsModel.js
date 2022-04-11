const mongoose = require("mongoose")

const logModelSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
      
    },
   userevent:{
       type:String
   },
   time : { type : Date, default: Date.now }
})



const logModel= new mongoose.model("logModel",logModelSchema)
module.exports=logModel