const advancedResults=(model,populate)=>async (req,res,next)=> {
    
 // Create query
 let query;

 let reqQuery=req.query

 // Remove fields array for reqQuery
 const removeFields=["Select","Sort","Limit","Page"]

 // Loop for remove fields from reqQuery
 removeFields.forEach(field=>delete reqQuery[field])
 
 // Create query string
 let queryStr=JSON.stringify(reqQuery)

 // Create operators (lte,lt,gt.. etc)
 queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`)

 // Set query
 query= model.find(JSON.parse(queryStr))

 // Sort query
 if(req.query.sort){
     const sortBy=req.query.sort.split(',').join(' ')
     query=query.sort(sortBy)
 }

 // Select query
 if(req.query.select){
     const selectBy=req.query.select.split(",").join(" ")
     query=query.select(selectBy)
 }

 // pagination
 let page=req.query.page || 1
 let limit=req.query.limit || 25
 let startIndex=(page-1) * limit
 let endIndex=page*limit
 let total=await model.countDocuments()

 query=query.skip(startIndex).limit(limit)

 // Create pagination object for response
 let pagination={}

 // Include next step
 if(endIndex<total){
     pagination.next={
         page:page+1,
         limit
     }
 }

 // Include previous step 
 if(startIndex>0){
     pagination.prev={
         page:page-1,
         limit
     }
 }

 // Add populate parametres
 if(populate){
    query=query.populate(populate)
 }


 // execute query
 const results=await query

 res.advancedResults={
     success:true,
     count:results.length,
     data:results
 }

}



module.exports=advancedResults;