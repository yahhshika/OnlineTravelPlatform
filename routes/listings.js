const express= require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validateListing} = require("../utils/middlewares");
const listingControl = require("../controllers/listing");
//npm i multer for making backend understand the file uploads.
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' }) //all the images will be saved at uploads, this folder will be automatically created, and this is temporary, that is just for testing because in real for storing images we will be using cloud storage

const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//show all listings: //post listing
router.route("")
    .get(wrapAsync(listingControl.allListing))
    .post(isLoggedIn,validateListing, upload.single('listing[image]'),wrapAsync(listingControl.postNewList));
    // .post(isLoggedIn, wrapAsync(listingControl.postNewList));
    // .post(isLoggedIn,validateListing, wrapAsync(listingControl.postNewList));
    // .post(upload.single('listing[image]'),(req,res)=>{
    //     try{

    //         res.send(req.file); //on using multer req.body becomes req.file !
    //     }catch(e){
    //         throw new ExpressError(400, e.message);
    //     }
    // })


//render new listing:
router.get("/new",isLoggedIn, listingControl.renderNewList);

// search thru keyword
router.get("/keyword", wrapAsync(listingControl.keyWordSearch));

//privacy
router.get("/privacy",(listingControl.privacy))

//terms
router.get("/terms",(listingControl.terms))

//edit route:
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingControl.renderEdit));

//put the edited list // delete the list and consecuting review // show the perticular list along with its reviews.
router.route("/:id")
    .put(isOwner,validateListing, upload.single('listing[image]'),wrapAsync(listingControl.putListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingControl.destroyListing))
    .get(isLoggedIn, wrapAsync(listingControl.showListing));


module.exports = router;