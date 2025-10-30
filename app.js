if(process.env.NODE_ENV != 'development'){
    require("dotenv").config();
    
}
// console.log(process.env.SECRET);



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingRoute = require("./routes/listings");
const reviewRoute = require("./routes/reviews");
const wrapAsync = require("./utils/wrapAsync");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const userRoute = require("./routes/users.js");




const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date().now + (7*24*60*60*1000),
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash()); //to be written below session()


app.use(passport.initialize());
app.use(passport.session()); //to maintain user session.
passport.use(new LocalStrategy(User.authenticate())); //to authenticate user that whether the user is registered or not, if new user than it must sign up else it can login

passport.serializeUser(User.serializeUser()); //serialize the user means store all the data related to the user
passport.deserializeUser(User.deserializeUser()); //deserialize the user means de-store that is remove the data related to the user.

// app.get("/demoUser", async(req,res)=>{
//     let fakeUser = new User({
//         email: "fake@fake.com",
//         username: "fakeUser"
//     })

//     let registeredUser = await User.register(fakeUser, "password");
//     res.send(registeredUser);

// })


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.listen(port, ()=>{
    console.log('app is listening');
})


main().then(()=>{
    console.log('connected to dp in app.js successfully');
    
}).catch(err=>{
    console.log("error in connecting to db in app.js: "+err); 
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLustAgain");
}

app.get("/favicon.ico", (req, res) => res.sendStatus(204));
app.use("/listing", listingRoute); // to be written after defination of multiple middlewares that we want to execute before routes.
app.use("/listing/:id/review", reviewRoute);
app.use("/", userRoute);



//testlisting
app.get("/testListing", wrapAsync(async(req, res)=>{
    let list = new Listing({
        title:"The villa house", 
        description: "This is a sample Listing",
        image:"",
        price: 1234,
        location:"Delhi, New Delhi", 
        country:"India"
    })
    await list.save();
    res.send("added sample");
}))

//root:
// app.get("/",(req,res)=>{
//     res.send("root is working");
// })

// for a non-existing route:
app.use((req, res, next) => {
    console.log("Reached unmatched route:", req.method, req.originalUrl);
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
    const {status= 500, message="Something went wrong"} = err;
    console.error("inside middleware: "+err);
    res.status(status).render("listing/error.ejs", {message,status});
})


