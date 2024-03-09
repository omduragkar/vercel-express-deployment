const Table=require("../../models/Table");
const order=require("../../models/order");
const { ROLE } = require("../../constants/role");
const user=require("../../models/user");
const response = require('../../utils/response');


const {tableNumber,_id}=req.body
const updateOrderByTableName=async(req,res)=>{
    const { restaurantId, order, orderType, couponCode, isCouponClaimed, instructions,tableNumber } = req.body
    const { mobileNumber, _id, userName } = req.userDetails
    /*
    order:[
        {
          menuId:"",
          quantity:"",
          instruction:"less spicy"
        }
      ]
      */
    try{
        const waiter=await user.findOne({_id});
        const prevOrder=await order.findOne({TableNumber:tableNumber}); 
        if(waiter.role===ROLE.WAITER)
        {
            
            let totalSum=0;
            const tempOrder=order.map(async (item)=>{
                const menuDetail=await Menu.findOne({menuId:item.menuId});
                totalsum=totalSum+menuDetail.price;
                return item;
            })
            prevOrder.order.map((curr)=>{
              tempOrder.push(curr);
            });
            /*
                [
                    {
                    menuId:"sfh",
                    quantity:4,
                    instruction:"less Spicy"
                    }
                ]
            */
                const summarizeValueByKey = (arr, key, val) => 
                [...arr
                  .reduce((acc,{[key]: keyProp, [val]: valProp}) => {
                    const group = acc.get(keyProp)
                    group
                      ? group[val] += valProp
                      : acc.set(keyProp, {[key]: keyProp, [val]: valProp})
                    return acc
                  }, new Map)
                  .values()]

                const newOrder=summarizeValueByKey(tempOrder,menuId,quantity);

                tempOrder.forEach(element => {
                  newOrder.forEach(element2 => {
                      if(element.menuId==element2.menuId)
                      {
                          element2.instructions=element.instructions
                      }
                  });
                });

                const orderSummaryNew=[]
                const orderSummaryOld=newOrder.map(async(currItem)=>{
                  const detail=await Menu.findOne({menuId:currItem.menuId});
                  const tempObj={}
                  orderSummaryNew.menuItem=detail.menuname;
                  orderSummaryNew.price=detail.price*currItem.quantity;
                  orderSummaryNew.quantity=currItem.quantity;
                  orderSummaryNew.push(tempObj);
                })

                prevOrder.orderSummary.map((item)=>{
                  orderSummaryNew.push(item);
                })
                
                const prepareUpdatedOrder=new order({
                    restaurantId,
                    order:newOrder,
                    orderAmount:totalSum+prevOrder.orderAmount,
                    orderSummary:orderSummaryNew,
                    instructions,
                    TableNumber:tableNumber,
                    totalOrderAmount:totalSum+prevOrder.orderAmount,
                    orderStatus:"CREATED",
                    paymentStatus:"PENDING"
                  })

                  const orderId=prepareUpdatedOrder._id
                  const orderData=await prepareUpdatedOrder.save()
                  if(orderData._id==orderId)
                  {
                    response(res,201,true,"Order updated Successfully",orderData);
                  }
                  else{
                    response(res,401,false,"Something wents wrong",null);
                  }
        }
        else
        {
            response(res,401,false,"Unauthorized Access",null);
        }

    }catch(error)
    {
        return response(res, 400, false, error.message, null); 
    }
    
}


module.exports=updateOrderByTableName