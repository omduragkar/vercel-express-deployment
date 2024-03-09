const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const { ORDERTYPE } = require('../constants/ordertype')

const OrderSchema = new Schema(
  {
    restaurantId: { type: Schema.ObjectId, ref: 'Restaurant', required: true }, // Reference to the associated restaurant.
    order: [
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
        selected:[],
        variationPrice:{
          type: Number,
          required: true
        },
        isEdited:{ type: Boolean, required: true, default:false },
      }
    ],
    orderStatus: { type: String, required: true,enum:["CREATED","PREPARED","BILLING","CANCELLED", "COMPLETED"] },
    paymentStatus: { type: Boolean, required: true, default:false },
    orderAmount: {
      totalItem:{
        type:Number, 
      },
      orderBeforeAddingGSTValue:{
        type:Number
      },
      orderExcludeGSTValue:{
        type:Number,
      },
      orderGst:{
        type:Number, 
      },
      discount:{
        type:Number,
        default:0
      },
      total:{ type: Number },
      finalTotal:{
        type:Number
      }
    },
    // userId: { type: Schema.ObjectId, ref: 'User', required: true },
    paymentDetails: { type: Object },
    couponCode: { type:Object },
    // uniqueOrderId: { type: String, required: true },
    isCouponClaimed:{
      type:Boolean
    },
    discountObj: { type: Object },
    packagingCharges: { type: Number },
    taxOnTotalAmount: { type: Number },
    paymentStatusFrom: { type: String, }, // track payment status from where
    orderType: { type: String, enum:[ORDERTYPE.CUSTOMIZED, ORDERTYPE.DELIVERY, ORDERTYPE.DINEIN, ORDERTYPE.ONLINE, ORDERTYPE.TAKEAWAY] },
    isDeleted: { type: Boolean, default: false },
    isEdited: { type: Boolean, default: false },
    specialInstruction: { type: String, maxLength: 500, default: '' },
    createdUser:{
      type: Schema.ObjectId, ref: 'User' 
    },
    table:{
      type: Schema.ObjectId, ref: 'Table'
    }, 
    customer:{
      type: Schema.ObjectId, ref: 'Customer'
        
    }
  },
  { timestamps: true }
)

OrderSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Order', OrderSchema)