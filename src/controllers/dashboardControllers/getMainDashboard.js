const order = require('../../models/order');
const restaurant = require('../../models/restaurant')
const response = require('../../utils/response')

const getMainDashboard = async (req, res) => {
  try {
    let { restaurantLinked = [] } = req.userDetails;
    let { restaurantId, startDate, endDate } = req.query;
    let isRestroExists = restaurantLinked.includes(restaurantId);
    let totalOrders = {
      completedOrders:0,
      cancelledOrders:0,
      orderCurrentlyRunning:0
    };
    let totalPayment = {
      total:0,
      UPI:0,
      CASH:0,
      OTHERS:0,
      CARD:0
    }
    let totalMenuItemsUsed = 0;

    if (isRestroExists) {
      console.log(new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)), startDate);
      console.log(new Date(new Date(endDate).setUTCHours(23, 59, 59, 59)), endDate);
      startDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
      endDate = new Date(new Date(endDate).setUTCHours(23, 59, 59, 59));
      console.log(endDate - startDate)
      if (endDate - startDate < 0) {
        response(res, 400, false, 'End Date cannot be less than Start Date. xErrorx1083', null);

      } else {
        let result = await order.find({
          $and: [{ restaurantId }, { createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }]
        }).select("orderAmount paymentStatus isDeleted orderStatus paymentDetails")
          // .populate("order.menuId table createdUser")

        // console.log({ result });
        // Logic for Getting total Orders:
        // totalOrders = result.length;
        for(let i = 0; i < result.length;i++){
          console.log({
            rs:result[i].orderStatus == "COMPLETED"  && !result[i].isDeleted,
            results:result[i]
          })
          if(result[i].orderStatus == "COMPLETED" && !result[i].isDeleted){
            let paidVia = result[i].paymentDetails?.paidVia;
            if( paidVia== "UPI"){
              totalPayment.UPI += result[i].orderAmount.total;
            }else if(paidVia == "CASH")
            {
              totalPayment.CASH += result[i].orderAmount.total;
            }else if(paidVia == "CARD"){
              totalPayment.CARD += result[i].orderAmount.total;
              
            }else{
              totalPayment.OTHERS += result[i].orderAmount.total;
            }
            totalPayment.total += result[i].orderAmount.total;
            totalOrders.completedOrders += 1;
          }else{
            if(result[i].orderStatus == "CREATED" || result[i].orderStatus == "PREPARED" || result[i].orderStatus == "BILLING" )
            {
              totalOrders.orderCurrentlyRunning += 1;
            }else{
              totalOrders.cancelledOrders += 1;
            }
            totalMenuItemsUsed += result[i].orderAmount.totalItem;
          }
        }
        response(res, 200, true, 'Dashboard User Roles', { result, totalMenuItemsUsed, totalPayment, totalOrders })

      }

    } else {

      // console.log({
      //   issue: "Not Authorized!",
      //   isRestroExists,
      //   restaurantLinked,
      //   restaurantId
      // })
      response(res, 400, false, 'Error in accessing. Not Authorized xErrorx1081', null);

    }
  } catch (err) {
    console.log(err);
    response(res, 400, false, 'Error Issue xErrorx1082', { err: err });
  }
}

module.exports = getMainDashboard
