const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const User = require("../models/users");
const ExpresError = require("../utils/ExpressError");
const passport = require("passport");
const {saveRedirectUrl} = require("../utils/middlewares");

const userController = require("../controllers/user");


//to render the signup page // to post the sign up detains
router.route("/signup")
    .get(userController.renderSignup)
    .post(userController.postSignUp);


//to render the login page  //to authenticate the login info automatically by the passport package

router.route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl,passport.authenticate(
        "local", //represents the type of strategy used
        {
            failureRedirect: "/login", //refers to where to redirect in case of error
            failureFlash: true //if we are using a flash message or not.  //this will create a req.flash("error", e.message);
        }
    ), userController.postLogin);



router.get("/logout",userController.logout);

module.exports = router;