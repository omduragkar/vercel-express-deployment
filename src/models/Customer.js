const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const { ROLE } = require('../constants/role')
const customerSchema = new Schema(
  {
    name: { type: String },
    mobileNumber: { type: String },
    relation: { type: String,  default:ROLE.CUSTOMER },
    referralCode: { type: String },
    restaurantLinked:{
        type: Schema.ObjectId, ref: 'Restaurant' 
    },
    value:{
        type:String
    },
    orders:[]
  },
  { timestamps: true }
)

customerSchema.plugin(uniqueValidator)

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer; 
