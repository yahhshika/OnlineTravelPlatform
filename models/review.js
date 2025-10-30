const mongoose = require("mongoose");

main().then(()=>{
    console.log('connected to dp in review.js successfully');
    
}).catch(err=>{
    console.log("error in connecting to db in listing.js: "+err); 
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLustAgain");
}

const reviews = new mongoose.Schema({
    comment: "String",
    rating:{
        type:Number,
        min: 1,
        max: 5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Review = new mongoose.model("Review", reviews);

module.exports = Review;