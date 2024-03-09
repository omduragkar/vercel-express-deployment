const { ROLE } = require("../../constants/role");
const mongoose = require('mongoose');
const response = require("../../utils/response");
const order = require("../../models/order");
const Table = require("../../models/Table");
const applyDiscount = async (req, res) => {
    let { orderId, discount } = req.body
    const { _id, role } = req.userDetails;
    // {
    //     "orderDetail": {
    //         "customer": {
    //             "name": "",
    //             "mobileNumber": "",
    //             "specialInstruction": "",
    //             "orderType": "DINEIN"
    //         },
    //         "order": [
    //             {
    //                 "specialInstruction": "Dahi Samose mat laa lena",
    //                 "_id": "63ced682c4a94e00f088de7f",
    //                 "quantity": 4,
    //                 "menuId": "63cb96c02fb6617958679401",
    //                 "cost": 280,
    //                 "item": {
    //                     "ignoreTaxes": false,
    //                     "ignoreDiscounts": false,
    //                     "_id": "63cb96c02fb6617958679401",
    //                     "categoryId": "63cb91d13c1c5b7020c50c04",
    //                     "packingCharges": "0",
    //                     "itemrank": "5",
    //                     "favorite": true,
    //                     "restaurantId": "63cb0c2b3f68cb3a0cd577e7",
    //                     "available": true,
    //                     "itemName": "Jeera Rice",
    //                     "itemShortName": "JR",
    //                     "itemAttributeid": "224",
    //                     "itemdescription": "Rice with no jeera tadka",
    //                     "minimumpreparationtime": "5 min",
    //                     "price": "70",
    //                     "itemTax": "5",
    //                     "variation": [],
    //                     "addon": [],
    //                     "createdAt": "2023-01-21T07:39:44.648Z",
    //                     "updatedAt": "2023-01-21T07:39:44.648Z",
    //                     "__v": 0
    //                 }
    //             },
    //             {
    //                 "specialInstruction": "",
    //                 "_id": "63cedcb0e6111b5b400411df",
    //                 "quantity": 2,
    //                 "menuId": "63cb94ec5eb5607494daf088",
    //                 "cost": 50,
    //                 "item": {
    //                     "ignoreTaxes": true,
    //                     "ignoreDiscounts": false,
    //                     "_id": "63cb94ec5eb5607494daf088",
    //                     "categoryId": "63cb91d13c1c5b7020c50c04",
    //                     "packingCharges": "0",
    //                     "itemrank": "5",
    //                     "favorite": true,
    //                     "restaurantId": "63cb0c2b3f68cb3a0cd577e7",
    //                     "available": true,
    //                     "itemName": "Plain Rice",
    //                     "itemShortName": "PR",
    //                     "itemAttributeid": "223",
    //                     "itemdescription": "Rice with no jeera tadka",
    //                     "minimumpreparationtime": "5 min",
    //                     "price": "50",
    //                     "itemTax": "0",
    //                     "variation": [],
    //                     "addon": [],
    //                     "createdAt": "2023-01-21T07:31:56.405Z",
    //                     "updatedAt": "2023-01-21T07:31:56.405Z",
    //                     "__v": 0
    //                 }
    //             }
    //         ],
    //         "orderType": "DINEIN",
    //         "specialInstruction": "",
    //         "restaurantId": "63cb0c2b3f68cb3a0cd577e7",
    //         "tableId": "63cb0c703f68cb3a0cd57803"
    //     },
    //     "oldOrderId": "63cedcb0e6111b5b400411dd"
    // }
    let rolesAllowed = [ ROLE.CAPTAIN, ROLE.OWNER]
    let resultRole = rolesAllowed.includes(role)
    try{
        if(resultRole){
            let orderFind = await order.findById(orderId);
            if(orderFind){
                let finTotal = orderFind?.orderAmount?.finalTotal?(Number(orderFind?.orderAmount?.finalTotal)):(Number(orderFind?.orderAmount?.total));
                let orderTotal = finTotal - Number(discount);
                let orderAmount = {...orderFind?.orderAmount, discount:Number(discount)};
                orderAmount.total = orderTotal;
                orderFind = await order.findByIdAndUpdate(orderId,{
                    orderAmount:orderAmount
                },{
                    new:true
                }).populate(["createdUser", "order.menuId", "table"]);
                response(res,200, true ,"Order",
                {
                    order:orderFind
                });
                
            }else{
                response(res,404, false,"Order Not Found", {
                    order:true
                })
            }
        }else{
            response(res,404, false,"Unauthorized Access", {
                user:true
            });
        }
      
    }catch(err){
      console.log(err);
      response(res, 400, false, "Error : ", {
        err:err
      })
    }
}
module.exports = applyDiscount