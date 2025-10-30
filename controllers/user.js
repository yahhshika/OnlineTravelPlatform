const User = require("../models/users");

module.exports.renderSignup = (req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.postSignUp = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({
            email: email,
            username: username,
        });
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }

            req.flash("success","Welcome to WanderLust !");
            res.redirect("/listing");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin =  (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.postLogin = async(req,res)=>{
    req.flash("success", `Welcome back @${req.user.username}!`);
    res.locals.redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(res.locals.redirectUrl);
    
};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You've successfully logged out !");
        res.redirect("/listing");
        
    })
};
