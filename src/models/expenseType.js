const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const ExpenseTypeSchema = new Schema({
    restaurantId: { type: Schema.ObjectId, ref: 'Restaurant', required: true },
    expenseType:{
        type:String,
        default:""
    }
},
  { timestamps: true }
)

ExpenseTypeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Type', ExpenseTypeSchema)
