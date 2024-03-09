const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const billingSchema = new Schema(
  {
    restaurantId: { 
        type: Schema.ObjectId, ref: 'Restaurant', required: true 
    }, // Reference to the associated restaurant.
    restaurantName:{
        type:String,
        default:""
    },
    restaurantImage:{
        type:String,
        default:""
    },
    restaurantShorts:{
        type:String,
        default:""
    },
    restaurantAddress:{
        type:String,
        default:""
    },
    restaurantMobileNumber:{
        type:String,
        default:""
    },
    billEndMessage:
    {
        type:String,
        default:""
    },
    poweredBy:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
)

billingSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Biller', billingSchema)