const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main().then(()=>{
    console.log('connected to dp in app.js successfully');
    
}).catch(err=>{
    console.log("error in connecting to db in app.js: "+err); 
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLustAgain");
}

const initDb = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map(object=>({...object, owner:'688da2debd4cb8aefe73274e'}));
    await Listing.insertMany(initData.data);
}
initDb().then(()=>{
    console.log("initialization for listing is done.");
})