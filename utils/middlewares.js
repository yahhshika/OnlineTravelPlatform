const Listing = require("../models/listing");
const Review = require("../models/review");
const {listingSchema, reviewSchema} = require("../LisintingSchema");
const ExpressError = require("./ExpressError");

module.exports.isLoggedIn=(req,res,next)=>{
    // console.log("req.user: "+req.user);
  
    
    // console.log("info: ",req.path,", ", req.originalUrl);
    
    if(!req.isAuthenticated()){
        // save the original url,
        req.session.redirectUrl = req.originalUrl; //so that the url is available throughout the session unless changed. and for different session different url could exist.
        // but again there is a problem, you'll go to the login page and passport package would reset the session variables the moment you login. thus the moment we redirect to /login we will again trigger a middleware  named saveRedirectUrl before logging in that will store the redirect url
        req.flash("error","you must login first !");
        res.redirect("/login");
    }else{
        next();
    }
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(res.locals.currUser && !list.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "Sorry! You are not the owner.");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(res.locals.currUser && !review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "Sorry! You are not the author.");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
    let result= listingSchema.validate(req.body);
    console.log(req.body);
    
    if(result.error){
        // console.log("error:", result.error);
        
        // console.log(result.error.details); //there's a fields of messages in details of error
        let message = result.error.details.map(el=>el.message).join(", ");
        // console.log(message); //join the messages in details of error obj //.map(el=>el.message) gives an array of messages
        
        throw new ExpressError(400, message);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    let result= reviewSchema.validate(req.body);
    if(result.error){
        // console.log("error:", result.error);
        
        // console.log(result.error.details); //there's a fields of messages in details of error
        let message = result.error.details.map(el=>el.message).join(", ");
        // console.log(message); //join the messages in details of error obj //.map(el=>el.message) gives an array of messages
        
        throw new ExpressError(400, message);
    }else{
        next();
    }
}