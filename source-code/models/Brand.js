const mongoose=require("mongoose")



const BrandSchema=new mongoose.Schema({
  name:{
      type:String, 
      required:[true,"Please add a name"],
      unique:true
  },
  description:String, 
  user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      //required:[true,"Please add a user"]
  },
  createdAt:{
      type:Date, 
      default:Date.now
  }
})



module.exports=new mongoose.model("BrandSchema",BrandSchema)