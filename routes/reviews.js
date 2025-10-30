const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const Listing = require("../models/listing");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../utils/middlewares");

const reviewConstroller = require("../controllers/review");


// add review:
router.post("",isLoggedIn, validateReview, wrapAsync(reviewConstroller.addReview));

//delete review and delete the review from the corresponding listing
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewConstroller.destroyReview));

module.exports = router;