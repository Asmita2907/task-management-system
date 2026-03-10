require("dotenv").config();
const mongoose=require("mongoose");



const dbConnect=async()=>{
    
       await mongoose.connect(process.env.MONGO_URI)
       .then(()=>{
            console.log("database connected");
       })
       .catch((err)=>{
        console.log(err);
       })
    }

module.exports=dbConnect;