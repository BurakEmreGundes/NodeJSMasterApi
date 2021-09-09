const fs=require('fs');
const mongoose=require('mongoose');
const path=require('path');
const colors=require('colors');

// Load models
const User=require("./models/User")
const Brand=require("./models/Brand")

// Get datas from files
const brands=JSON.parse(fs.readFileSync(path.join(__dirname,"./_data/brands.json")))
const users=JSON.parse(fs.readFileSync(path.join(__dirname,"./_data/users.json")))


// env vars 
require("dotenv").config({
    path: path.join(__dirname,"./config/config.env")
})

// Connect DB
mongoose.connect(process.env.MONGO_URI,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


// import into to DB
const importData=async ()=>{
    try {
        await User.create(users)
        await Brand.create(brands)
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

// Delete data from DB
const deleteData=async()=>{
    try {
        await User.deleteMany()
        await Brand.deleteMany()
        console.log('Data Deleted...'.red.inverse)
        process.exit()
     } catch (error) {
         console.error(error)   
     }
}


// Select operation
if(process.argv[2]=="-i"){
    importData()
}else if(process.argv[2]=="-d"){
    deleteData()
}
 

