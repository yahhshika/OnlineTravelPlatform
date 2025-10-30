const Joi = require('joi');
//we could have validated these things using mongoose db also but tol avoid more and more db interactions we are using joi.
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        // image: Joi.object({
        //     url: Joi.string().required(),
        //     filename: Joi.string().required(),
        // }).required(),
        category: Joi.array().items(Joi.string().valid("Trending","Rooms", "IconicCity", "Camping", "Farms", "AmazingPools")),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
})  
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})