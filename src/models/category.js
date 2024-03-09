const mongoose = require('mongoose') // Import the mongoose module
const Schema = mongoose.Schema // Import the Schema module from mongoose
const uniqueValidator = require('mongoose-unique-validator') // Import the uniqueValidator module from mongoose-unique-validator

// Making Schema for the Category
const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
    categoryRank: {
      type:String,
    },
    menu:[
      {type: Schema.ObjectId, ref: 'Menu' }
    ],
    restaurantId: {type: Schema.ObjectId, ref: 'Restaurant' }

  },
  { timestamps: true }
)

categorySchema.plugin(uniqueValidator) // Add the uniqueValidator plugin to the categorySchema

module.exports = mongoose.model('Category', categorySchema) // Exporting the categorySchema