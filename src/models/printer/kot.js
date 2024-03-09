const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const kotSchema = new Schema(
  {
    restaurantId: {
      type: Schema.ObjectId, ref: 'Restaurant', required: true
    }, // Reference to the associated restaurant.
    topMessage: {
      type: String,
      default: ""

    },
    kotEndMessage:
    {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
)

kotSchema.plugin(uniqueValidator)

module.exports = mongoose.model('KOT', kotSchema)