const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {TYPE}=require("../constants/coupon")
const uniqueValidator = require('mongoose-unique-validator')

const CouponSchema = new Schema({
    couponValue:{
        type:Number,
        required:true
    },
    couponId:{
        type:Number,
        required:true
    },
    couponName:{
        type:String,
        required:true
    },
    validOn:{
        type:String,
        required:true,
        enum:[TYPE.MENU,TYPE.ORDER,TYPE.BOTH]
    },
    isPercent:{
        type:Boolean,
        required:true
    },
    menuId:{
        type:[Schema.ObjectId], ref:"Menu"
    },
    expiryDate:{
        type:Date,
        required:true
    }
  },
  { timestamps: true }
)

CouponSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Coupon', CouponSchema)
