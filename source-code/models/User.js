const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const UserSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:[true,"Please add a name"]
    },
    email:{
        type:String,
        required:[true,"Please add a email address"],
        unique:true,   
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please add a valid email address"]
    },
    password:{
        type:String, 
        minLength:6,
        required:true
    },
    role:{
        type:String, 
        required:true,
        enum:["manager","user"]
    },
    createdAt:{
        type:Date, 
        default:Date.now
    }

})


// Hash the password when before save user
UserSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})



// Match password control
UserSchema.methods.matchPassword=function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

// Create token 
UserSchema.statics.getSignedJwtToken=async function (){
    return await jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}



module.exports=new mongoose.model("User",UserSchema)