const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

main().then(()=>{
    console.log('connected to dp in users.js successfully');
    
}).catch(err=>{
    console.log("error in connecting to db in listing.js: "+err); 
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLustAgain");
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;