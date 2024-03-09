const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const floorSchema = new Schema({
    floorName:{
        type:String,
        required:true,
    },
    tables:
    [{
        type: Schema.ObjectId, ref: 'Table'

    }],
    status:{
        type:String,
        required:true,
        enum:["OPEN", "CLOSED"],
        default:"OPEN"
    },
    restaurantId:{
        type: Schema.ObjectId, ref: 'Restaurant'
    },
    
  },
  { timestamps: true }
)

floorSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Floor', floorSchema)