const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const variationSchema = new Schema({
    variationName: {
        type: String,
    },
    restaurantId: {type: Schema.ObjectId, ref: 'Restaurant' },
    variationAvaialable:{
        type:Boolean
    },
    variationOptions:[
        {
            optName:{
                type: String,
            },
            price: {
                type: String,
            },
            available:{
                type:Boolean
            }
        }
    ],
    addonSelectionMin: { type: String },
    addonSelectionMax: { type: String }

});

variationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Variations', variationSchema)
