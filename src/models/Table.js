const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const TableSchema = new Schema({
    TableName:{
        type:String,
        required:true,
    },
    tableCapacity:
    {
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["OCCUPIED", "BILLING", "VACANT", "ORDERING"],
        default:"VACANT"
    },
    restaurantId:{
        type: Schema.ObjectId, ref: 'Restaurant'
    },
    orderId:{
        type: Schema.ObjectId, ref: 'Order'
    },
    waiter:{
        type: Schema.ObjectId, ref: 'User'
    },
    floor:{
        type: Schema.ObjectId, ref: 'Floor'
        
    }
    
  },
  { timestamps: true }
)

TableSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Table', TableSchema)