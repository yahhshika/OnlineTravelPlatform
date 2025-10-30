const mongoose = require("mongoose");
const Review = require("./review");
main().then(()=>{
    console.log('connected to dp in listing.js successfully');
    
}).catch(err=>{
    console.log("error in connecting to db in listing.js: "+err); 
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLustAgain");
}


const listingSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String
    },
    image:{
        filename: String,
        url:String,
    },
    price:{
        type:Number,
        // required: true,
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    review:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category:[{
        type:String,
        enum:["Trending", "Rooms", "IconicCity", "Camping", "Farms", "AmazingPools"]
    }]
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    
    if(listing){
        // console.log(listing.review);
        await Review.deleteMany({_id: {$in: listing.review}});
    }
})

const Listing = mongoose.model("List", listingSchema);
module.exports = Listing;