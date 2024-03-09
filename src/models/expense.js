const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const ExpenseSchema = new Schema({
    restaurantId: {type: Schema.ObjectId, ref: 'Restaurant'},
    expenseType:{type: Schema.ObjectId, ref: 'Type'},
    amount:{type:Number, required:true},
    date:{type:Date,required:true},
    specialInstruction:{type:String,default:""},
    createdBy:{ type: Schema.ObjectId, ref: 'User', required: true },
    assigneeId:{type: Schema.ObjectId, ref: 'User', required: true}
  },
  { timestamps: true }
)

ExpenseSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Expense', ExpenseSchema)
