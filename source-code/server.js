const express=require("express");
const app=express();
const path=require("path");
const colors=require("colors");
const morgan=require("morgan");
const connectDB=require("./config/db")


// .env vars
require("dotenv").config({
    path: path.join(__dirname,"./config/config.env")
})
const PORT=process.env.PORT || 5000


// Routers
const brandRouter=require("./routes/brands")
const authRouter=require("./routes/auth")



// Connect Database
connectDB()

// Dev Logger Service
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}



// Mount routes
app.use("/api/v1/brands",brandRouter)
app.use("/api/v1/auth",authRouter)


// Listening to the server and log this runtime mode on console
let server=app.listen(PORT,_=>{
    console.log(`Server ${process.env.NODE_ENV} modunda çalışıyor ve ${PORT} portunu dinliyor.`.yellow.bold)
})


// Handle unhandled promise rejections
process.on("unhandledRejection",(error,promise)=>{
    console.log(`Error: ${error.message}`.red.bold)
    // Close server & exit process
    server.close(()=>process.exit(1))
})
