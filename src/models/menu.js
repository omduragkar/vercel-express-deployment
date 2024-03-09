const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const MenuSchema = new Schema({
    categoryId: {type: Schema.ObjectId, ref: 'Category' },
    itemrank: { type: String },
    packingCharges: { type: String },
    allowaddon: { type: Boolean },
    favorite: { type: Boolean },
    ignoreTaxes: { type: Boolean, default:false },
    ignoreDiscounts: { type: Boolean, default:false },
    available: { type: Boolean, default:true },
    variations: [
      { type: Schema.ObjectId, ref:'Variations' }
    ],
    addons: [
      { type: Schema.ObjectId, ref:'Variations' }
    ],
    itemName: { type: String, required:true },
    itemShortName: { type: String, required:true },
    itemAttributeid: { type: String, required:true },
    itemdescription: { type: String },
    minimumpreparationtime: { type: String },
    price: { type: String },
    itemImageUrl: { type: String },
    itemTax: { type: String, default:"0"},
    restaurantId: {type: Schema.ObjectId, ref: 'Restaurant' },

  },
  { timestamps: true }
)

MenuSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Menu', MenuSchema)
