const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const consumerSchema = new Schema(
  {
    name: { type: String },
    mobileNumber: { type: String },
    dateOfBirth:{type:String},
    isSameWhatsappNumber: { type: Boolean, default: false },
    balanceAmount: { type: Number, default: 0 },
    restaurantId: { type: Schema.ObjectId, ref: 'Restaurant', required: true }, // Reference to the associated restaurant.
    orders:[{ type: Schema.ObjectId, ref: 'Order'}]
  },
  { timestamps: true }
)

consumerSchema.plugin(uniqueValidator)

const Consumer = mongoose.model('Consumer', consumerSchema)
module.exports = Consumer;
