const User=require("../models/User")
const jwt=require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.protect=async (req,res,next)=>{
    let token;

    // Check token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.header.authorization.split(' ')[1]
    }else if(res.cookies.token){
        token=res.cookies.token
    }

    // Make sure token exists
    if(!token){
        return next(ErrorResponse("Not authorize to access this route",401))
    }



    try {
        // Verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded._id)

        req.user=user
        next()
    } catch (error) {
        return next(ErrorResponse("Not authorize to access this route",401))
    }

}

exports.authorize=(...roles)=>(req,res,next)=>{
    if(roles.includes(req.user.role)){
        next();
    }else{
        return next(ErrorResponse("Not authorize to access this route",401))
    }
}