const User=require("../models/User")
const ErrorResponse=require("../utils/errorResponse")
const asyncHandler=require("../middlewares/async")


// @desc Register user
// @route POST /api/v1/users/register
// @access Public
exports.register=asyncHandler(async (req,res,next)=>{
    
    // Create user
    const user=await User.create(req.body)

     // Create token and send response
     sendTokenResponse(user,201,res)

})

// @desc Login user
// @route POST /api/v1/users/login
// @access Public
exports.login=asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body
    
    // Valid email and password
    if(!email || !password){
       return next(new ErrorResponse("Please add a email and an password",400))
    }

    // Check email
    const user=await User.findOne({email:email})

    // Check user
    if(!user){
        return next(new ErrorResponse("Invalid Credentials",401))
    }

    // Match password operation
    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        return next(new ErrorResponse("Invalid Credentials",401))
    }

    // Create token and send response
    sendTokenResponse(user,200,res)

})


// Create token and send response
const sendTokenResponse=async (user,statusCode,res)=>{
    // Create token 
   const token=await user.getSignedJwtToken();

    // Set options for cookie
    const options={
        expires:1000,
        httpOnly:true,
    }

    // Edit options for cookie
    if(process.env.NODE_ENV==="production"){
        options.secure=true
    }

    res.cookie("token",token,options).status(statusCode).json({success:true,token})

}
