const { ROLE } = require("../../constants/role");
const Table = require("../../models/Table");
const menu = require("../../models/menu");
const order = require("../../models/order");
const restaurant = require("../../models/restaurant");
const response = require("../../utils/response");
const orderStatus = async (req, res) => {
    const { tableId, orderId, status } = req.body
    const { _id, role } = req.userDetails
    let rolesAllowed = [ROLE.WAITER, ROLE.CAPTAIN, ROLE.OWNER]
    let resultRole = rolesAllowed.includes(role)
    let statusAllowed = ["CREATED","PREPARED","BILLING",]
      let resultStatus = statusAllowed.includes(status)
    try{
      if(resultRole &&  resultStatus)
      {
        let changeOrderStatus = await order.findByIdAndUpdate(orderId, {
          orderStatus:status
        },
        {
        new:true
        });
        if(changeOrderStatus){
          if(status=="BILLING"){
              let changingTableStatus= await Table.findByIdAndUpdate(tableId, {
                  status:"BILLING",
              },{
                  new:true
              });
              
              response(res, 200, true, "Order Status and Table Status Changed Successfully", {orderStatus:changeOrderStatus, table:changingTableStatus});
  
          }else{
              
              response(res, 200, true, "Order Status Changed Successfully", {orderStatus:changeOrderStatus});
          }

        }else{
          response(res, 400, false, "Order Updation Failed", null)
        }
        // if(status){
        //   if(tableOccupy){
        //     response(res, 200, true, "Order Created Successfully", {orderStatus:status});
            
        //   }else{
  
        //     response(res, 400, "Error in adding it to table", {
        //       message:"Internal Server Issue"
        //     })
  
        //   }
        // }else{
        //   response(res, 400, "Error in creating Order", {
        //     message:"Internal Server Issue"
        //   })
        // }
      }
      else{
        response(res,404, false,"Unauthorized Access", null);
      }
      
    }catch(err){
      console.log(err);
      response(res, 400, false, "Error : ", {
        err:err
      })
    }
}
  module.exports = orderStatus