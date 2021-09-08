const asyncHandler=require("../middlewares/async")
const Brand=require("../models/Brand")
const ErrorResponse=require("../utils/errorResponse")


// @desc Get Brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands=asyncHandler(async ()=>{
    res.status(200).json(res.advancedResults)
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

