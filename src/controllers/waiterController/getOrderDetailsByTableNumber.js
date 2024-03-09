const response = require('../../utils/response');
const { ROLE } = require("../../constants/role");
const order=require("../../models/order");
const user=require("../../models/user");
/*
{
    waiterid,
    waiterRole,
    TableNumber:3/tableid
}
    

*/

const {tableId,waiterId}=req.body

const getOrderDetailsByTableNumber=async(req,res)=>{
    
    try{
        const waiter=await user.findOne({_id});
        const orderDetail=await order.findOne({TableNumber:tableId});
        if(waiter.role===ROLE.WAITER)
        {
            if(orderDetail.orderStatus=="CREATED"||orderDetail.orderStatus=="PREPARED"||orderDetail.orderStatus=="BILLING")
            {
                const orderDetails={
                    orderSummary:orderDetail.orderSummary,
                    orderStatus:orderDetail.orderStatus,
                    orderAmount:orderDetail.orderAmount,
                    paymentStatus:orderDetail.paymentStatus
                }
                response(res,201,true,"Order Fetched Successfully",orderDetails);
            }
            else{
                response(res,401,false,"Order Cancelled",null);
            }
        }
        else{
            return response(res, 400, false, 'Something went wrong', { err: err.message })
        }

    }catch(error)
    {
        return response(res, 400, false, 'Something went wrong', { err: err.message })
    }
}

module.exports=getOrderDetailsByTableNumber