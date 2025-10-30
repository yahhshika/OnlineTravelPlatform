const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");


//show all listing : index route
module.exports.allListing = async(req,res)=>{
    let {filter} = req.query; 
    if(filter){
        // return res.send("filter found "+filter);
        let listings = await Listing.find({category: filter});
        if(!listings.length){
            req.flash("error", "no listing found")
            return res.redirect("/listing");
            
        }
        return res.render("listing/listings.ejs", {listings});
        // console.log(listings);
        
    }
    let listings = await Listing.find();
    // console.log(list);
    // res.send("found all listings");
    res.render("listing/listings.ejs", {listings});
};

//add new listing: 
//render newList.ejs
module.exports.renderNewList = (req,res)=>{
    res.render("listing/newListing.ejs");
};


//post the new Listing
module.exports.postNewList = async(req,res,next)=>{
    let {listing} = req.body;

    let url = req.file.path;
    let filename = req.file.filename;
    if(listing.category && !Array.isArray(listing.category)){
        listing.category = [listing.category];
    }
    let newList = new Listing(listing);
    newList.image = {url, filename};
    newList.owner = req.user._id;


    await newList.save();

    
    // console.log('filename: '+filename);
    // console.log('url: '+url);
    
    
    req.flash("success","New Listing Added Succesfully!");
    res.redirect("/listing");
};


//Edit the listing: 
//render edit.ejs
module.exports.renderEdit = async(req,res)=>{
    let {id} = req.params;
    
    let list = await Listing.findById(id);
    
    if(!list){
        req.flash("error", "The Listing you requested does not exist.");
        res.redirect("/listing");
    }else{
        let originalimg = list.image.url;
        originalimg = originalimg.replace("/upload", "/upload/w_250"); //checkout cloudinary image tranformations
        res.render("listing/edit.ejs", {list, originalimg}); //original image will lesser quality for preview
    }
};

//put the updated listing
module.exports.putListing = async(req,res)=>{
    let {id} = req.params;
    let {listing} = req.body;
    if(!listing){
        throw new ExpressError(400, "Invalid Listing Data");
    }
    if(listing.category && !Array.isArray(listing.category)){
        listing.category = [listing.category];
    }
    let updatedlisting = await Listing.findByIdAndUpdate(id, listing, {runValidators: true});
    if(typeof req.file !== "undefined"){ //another way of simply writing if(req.file)

        let filename = req.file.filename;
        let url = req.file.path;
        updatedlisting.image = {filename, url};
        updatedlisting = await updatedlisting.save();
    }
    
    req.flash("success", "Updated Listing");
    res.redirect(`/listing/${id}`);
};


//delete the listing
module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Deleted Listing");
    res.redirect("/listing");
};

//show a partucular listing with reviews on it:
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(`${id}`).populate(
        {
            path:"review",
            populate:{
                path: "author",
            }
        },
        
    ).populate("owner");
    // console.log(list);
    
    
    if(!list){
        req.flash("error", "The Listing you requested does not exist.");
        res.redirect("/listing");
    }else{
        // console.log(list);
        
        res.render("listing/showList.ejs", {list});
    }

};



//search using keyword:
const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
module.exports.keyWordSearch = async(req,res)=>{
    let keyword = req.query.keyword;
    if(!keyword){
        redirect("/listing");
    }
    const regex = new RegExp(escapeRegex(keyword),'i'); // i is for case senstivity

    let filters = [
        {title: regex},
        {description: regex},
        {location: regex},
        {country: regex},
        {category: regex}
    ]
    const keywordNum = Number(keyword);
    if (!isNaN(keywordNum)) {

        const range = keywordNum/3;
        filters.push({ price: {$gte: keywordNum-range , $lte: keywordNum+range} });
    }
    let listings = await Listing.find({$or: filters })
    // let result = listings? listings: "nothing found";
    // res.send(result);
    // console.log(listings);
    
    if(listings.length==0){
        req.flash("error","No such listing found");
        return res.redirect("/listing")
    }
    res.render("listing/listings.ejs", {listings});

};

module.exports.privacy = (req,res)=>{
    try{
        res.render("footerUtils/privacy.ejs");
    }catch(e){
        throw new ExpressError(400,e.message);
    }
}
module.exports.terms = (req,res)=>{
    try{
        res.render("footerUtils/terms.ejs");
    }catch(e){
        throw new ExpressError(400,e.message);
    }
}