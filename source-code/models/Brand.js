const mongoose=require("mongoose")
const slugify=require("slugify")


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
  slug:String,
  isActive:{
      type:Boolean,
      default:true
  },
  createdAt:{
      type:Date, 
      default:Date.now
  }
})


// Slug this name
BrandSchema.pre("save",async function(next){
    this.slug=slugify(this.name)
    next();
})




module.exports=new mongoose.model("BrandSchema",BrandSchema)