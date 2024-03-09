const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uniqueValidator = require('mongoose-unique-validator')

const rechargeSchema = new mongoose.Schema(
  {
    rechargeValue: {
        type:Number,
        required:true,
        default:-1
    },
    rechargeStatus:{
        type:Boolean,
        required:true,
        default:false,
    },
    rechargeValidity:{
        type:String,
    },
    rechargeType:{
        type:String,
        enum:["2000 ORDERS", "5000 ORDERS", "Unlimited", "TRIAL"]
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant'
    }
    
  },
  { timestamps: true }
)

rechargeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Recharge', rechargeSchema)
