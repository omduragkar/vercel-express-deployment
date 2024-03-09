const response = require('../../utils/response')
const order = require('../../models/order')
const getOrderReport = async (req, res) => {
    const { restaurantId, startDate, endDate} = req.query;
    const userDetails = req.userDetails
    try {
        // let findUser = userDetails;
        // We need to check the userDetails have restaaurantId of that's being asked thus:
        let  isAllowed = userDetails.restaurantLinked.includes(restaurantId);
        if(isAllowed)
        {
            const adjustedEndDate = new Date(endDate).setUTCDate(new Date(endDate).getUTCDate() + 1) //because the enddate is comming 1 less
            // console.log("The start date is",new Date(new Date(startDate).setUTCHours(24, 0, 0, 0)))
            // console.log("The end date is",new Date(new Date(adjustedEndDate).setUTCHours(23, 59, 59, 999)))  
            const data=await order.
                find({
                    restaurantId,
                    $and:[{ createdAt: { $gte:new Date(new Date(startDate).setUTCHours(24, 0, 0, 0)) 
                    } 
                }, { createdAt: { $lte: new Date(new Date(adjustedEndDate).setUTCHours(23, 59, 59, 999)) } }]}).populate('table')

                console.log("The data is =======>>>>>>>>>>", data);
            if(data)
            {
                var report=[]
                var totalCollection=0
                var totalGST=0
                wholeData={}
                //  Added promise so that it will wait for the complete map to get executed later will go forward:
                Promise.all(await data.map(async (ele,index,arr)=>{
                    
                    let obj={};
                    obj.billNo=ele._id;
                    obj.table=ele.table.TableName
                    obj.foodBillAmount=ele.orderAmount.finalTotal || ele.orderAmount.total + ele.orderAmount.discount
                    obj.discount=ele.orderAmount.discount
                    obj.received=ele.orderAmount.total
                    obj.orderStatus = ele.orderStatus;
                    if(ele.paymentStatus==true)
                    {
                        obj.remark="Paid"
                    }else{
                        obj.remark="Unpaid"
                    }
                    // totalCollection = totalCollection + ele.orderAmount.total
                    if(ele.orderStatus == "COMPLETED"){
                        totalCollection = totalCollection + ele.orderAmount.total
                    }
                    totalGST = totalGST + arr[index].orderAmount.orderGst
                    report.push(obj)
                    wholeData.totalCollection=totalCollection
                    wholeData.totalGST=totalGST
                    wholeData.report=report
                }))
                
                
                response(res, 200, true, 'Fetched Successfully',wholeData)
            }
            else
            {
                response(res, 200, true, 'No data found',null)
            }
        }
        else{
            response(res, 500, false, 'Restricted Access Not Allowed', null)
        }

  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getOrderReport