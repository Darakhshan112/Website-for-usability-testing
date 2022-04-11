const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/SQEWork",{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log("Connected")
}).catch((e)=>{
    console.log("no connection")
})