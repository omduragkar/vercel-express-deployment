const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uniqueValidator = require('mongoose-unique-validator')

const orderItemSchema = new mongoose.Schema(
  {
    menuId: {
        type: Schema.ObjectId,
        ref: 'Menu',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    specialInstruction:{type:String,default:""},
    cost:{
        type:Number,
    },
    isEdited:{
        type:Boolean, 
        default:false
    },
    
    
  },
  { timestamps: true }
)

orderItemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('OrderItem', orderItemSchema)
