const Review = require("../models/review");
const Listing = require("../models/listing");



//add a review
module.exports.addReview = async(req,res)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id);
    let {review} = req.body;
    let newreview = new Review(review);
    newreview.author = req.user._id;
    listing.review.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "Added a review");

    res.redirect(`/listing/${id}`);

};

//delete review
module.exports.destroyReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    console.log('inside what you wanted');
    
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}}); //$pull means dhundo aur dhund k delete krdo

    req.flash("success", "Deleted a review");

    res.redirect(`/listing/${id}`);
};