const router=require("express").Router();
const {getBrands,updateBrand}=require("../controllers/brands")


// Export authentication and authorization middlewares
const {protect,authorize}=require("../middlewares/auth")

// Export advanced results middleware
const Brand=require("../models/Brand")
const advancedResults=require("../middlewares/advancedResults")

router.route("/").get(advancedResults(Brand,{
    path:"user",
    select:"name"
}),getBrands)

router.route("/:brandId").put(protect,authorize("admin","manager"),updateBrand)


module.exports=router