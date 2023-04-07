const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//Creat Product-- Admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
   
   req.body.user=req.user.id
   
    const product= await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })
    })

    // Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });


//Get all Products
exports.getAllProducts=catchAsyncErrors(async(req,res)=>{

    const resultPerPage=5;
    const productsCount=await Product.countDocuments()
   const apiFeature= new ApiFeatures(Product.find(),req.query).search().filter()
   let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage); 
  products= await apiFeature.query
   res.status(200).json({success:true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,})
   })

//Get Product Details
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product)
    return next(new ErrorHandler("Product not Found",404))
    res.status(200).json({
        success:true,
        product,
        
    })


})

//Update Product--Admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findByIdAndRemove(req.params.id)
    if(!product)
    return next(new ErrorHandler("Product not Found",404))
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
useFindAndModify:false})

res.status(200).json({
    success:true,
    product
})
})


//Delete Product
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)

    if(!product)
    return next(new ErrorHandler("Product not Found",404))
    await product.remove();

    // product=await Product.findByIdAndDelete(req.params.id,req.body,{new:true,
    //     runValidators:true,
    // useFindAndModify:false})

    
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
})

//Create new review or update the review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product=await Product.findById(productId)
     
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id)
    if(isReviewed){
      product.reviews.forEach(rev=>{
        if(rev.user.toString()===req.user._id)
        rev.rating=rating,
        rev.comment=comment
      })
    }
    else{
      product.reviews.push(review)
      product.numOfReviews=product.reviews.length  
    }

    let avg=0
    product.reviews.forEach(rev=>{
        avg=avg+ rev.rating
    })
    
    product.ratings= avg/product.reviews.length

    product.save({validateBeforeSave:false} )

    res.status(200).json({
        success:true
    })
})

//Get All Reviews
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id)
    if(!product)
    return next(new ErrorHandler("Product not Found",404))
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

//Delete Reviews
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId)
    if(!product)
    return next(new ErrorHandler("Product not Found",404))

    let avg=0
    reviews.forEach(rev=>{
        avg=avg+ rev.rating
    })
    
    const ratings= avg/reviews.length
    const numOfReviews=reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString())
    res.status(200).json({
        success:true,
        
    })

})