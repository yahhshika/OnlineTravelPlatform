const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// value name could be anything, i.e. you can use any names in .env but here key names should be as it is.

//code available at cloudinary original docs not on npmjs.com
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// code available on npmjs.com -> multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png", "jpg","jpeg"],
  },
});

module.exports = {
    cloudinary, storage
};