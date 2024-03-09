const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uniqueValidator = require('mongoose-unique-validator')

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true }, //ask for phone no and email and createdBy the vendor id should b saved; so that he can only edit and update; same for menus too
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    owner_ids: [{ type: Schema.ObjectId, ref: 'User' }],
    openingTime: { type: String, default: '9 am' },
    closingTime: { type: String, default: '9 pm' },
    isRestaurantActive: { type: Boolean, default: true },
    isGstRegistered: { type: Boolean, required: true },
    GstValue: { type: Number, required: true },
    accountNumber: { type: String },
    bankName: { type: String },
    ifscCode: { type: String },
    categories: [
      {type: Schema.ObjectId, ref: 'Category' }
    ],
    createdBy:{
      type: Schema.ObjectId, ref: 'User'
    },
    floors:[
      {type: Schema.ObjectId, ref: 'Floor' }
    ],
    rechargeInfo:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Recharge'
    },
    staff:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    print:{
      kot:{ type: mongoose.Schema.Types.ObjectId, ref: 'KOT' },
      billing:{ type: mongoose.Schema.Types.ObjectId, ref: 'Biller' }
    }
  },
  { timestamps: true }
)

restaurantSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Restaurant', restaurantSchema)