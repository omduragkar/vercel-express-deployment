const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const { ROLE } = require('../constants/role')
const userSchema = new Schema(
  {
    name: { type: String },
    pin: { type: String },
    mobileNumber: { type: String, required: true },
    jwtToken: { type: String },
    role: { type: String, required: true, enum: [ROLE.ADMIN, ROLE.CAPTAIN, ROLE.CHEF, ROLE.WAITER, ROLE.OWNER] },
    isLogin: { type: Boolean, required: true },
    referralCode: { type: String },
    fcmTokenAndroid: { type: String },
    restaurantLinked:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
    accesss: [{ type: String }],
  },
  { timestamps: true }
)

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)
module.exports = User; 
