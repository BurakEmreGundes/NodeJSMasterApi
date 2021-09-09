const asyncHandler=require("../middlewares/async")
const Brand=require("../models/Brand")
const ErrorResponse=require("../utils/errorResponse")


// @desc Get Brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands=asyncHandler(async ()=>{
    if(req.params.userId){
       const brands=await Brand.find({user:req.params.userId}).populate({
            path:"user",
            select:"name role"
        })
        return res.status(200).json({success:true,data:brands})
    }else{
       return res.status(200).json(res.advancedResults)
    }
    
})

// @desc Create brand
// @action POST /api/v1/brands
// @access Private
exports.addBrand=asyncHandler(async ()=>{
    // Create
    const brand=await Brand.create(req.body)

    res.status(201).json({ success:true,data:brand })
})





// @desc Update Brand
// @route PUT /api/v1/brands/:brandId
// @access Private
exports.updateBrand=asyncHandler(async ()=>{
    let brand=await Brand.findById(req.params.brandId)

    // Check brand
    if(!brand){
        return next(new ErrorResponse(`Brand not found with the id of ${req.params.brandId}`))
    }

    // Man
    if(!req.user._id===brand.user.toString() || req.user.role!=="admin"){
        return next(new ErrorResponse("",401));
    }

    brand= await Brand.findByIdAndUpdate(brand._id,req.body,{new:true,runValidators:true})

    res.status(200).json({success:true,data:brand})

    
})



// @desc Delete Brand
// @action DELETE /api/v1/brands/:brandId
// @access Private
exports.deleteBrand=asyncHandler(async(req,res,next)=>{
    const brand=await Brand.findById(req.params.brandId);

    // Check brand
    if(!brand){
        return next(new ErrorResponse(`Brand not found with the id of $${req.params.brandId}`,404));
    }

    // Ma
    if(req.user._id!==brand.user.toString() || req.user.role!=="admin"){
        return next(new ErrorResponse("",401))
    }
    
    // Delete brand 
    await brand.remove();

    res.status(200).json({success:true,data:brand})
})
