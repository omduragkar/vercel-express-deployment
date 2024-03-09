const response = require('../../utils/response')
const order = require('../../models/order')
const topHistory = async (req, res) => {
    const { restaurantId, startDate, endDate} = req.query;
    const userDetails = req.userDetails
    try {
        // let findUser = userDetails;
        // We need to check the userDetails have restaaurantId of that's being asked thus:
        let  isAllowed = userDetails.restaurantLinked.includes(restaurantId);
        if(isAllowed)
        {
            const data=await order.
                find({
                    restaurantId,
                    $and:[{ createdAt: { $gte:new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) 
                    } 
                }, { createdAt: { $lte: new Date(endDate) } }]})
                .populate({path:"order",
                populate:{
                    path:"menuId"
                }
                })
                if(data)
                {

                    //to count numbers of itemname occured between date
                    var arr=[]
                    // var count=0
                    Promise.all(await data.map(async(element)=>{
                        element.order.forEach((ele)=>{
                            newItem={
                                itemName:ele.menuId.itemName
                            }
                            // count++;
                            newItem.price=ele.menuId.price
                            newItem.count=ele.quantity
                            arr.push(newItem)
                        })
                    }))

                    //to getting unique values of orders
                    var Narr=[]
                    const checkItem=async(itemName)=>{
                    for(var i=0;i<Narr.length;i++)
                    {
                        if(itemName==Narr[i].itemName)
                        {
                            return true
                        }
                    }
                    }

                    Promise.all(arr.forEach((ele)=>{
                    if(checkItem(ele.itemName))
                    {
                        const index=Narr.findIndex((element)=>{
                        if(element.itemName==ele.itemName)
                        {
                            return element
                        }
                        })
                        //code
                        // here
                        Narr[index].count=Narr[index].count+ele.count
                    }
                    else
                    {
                        Narr.push({itemName:ele.itemName,count:ele.count,price:ele.price})
                    }
                    }))

                    Promise.all(Narr.forEach((ele)=>{
                        ele.total=ele.price*ele.count
                      }))
                      
                      //sort the values descending
                      Promise.all(Narr.sort((a, b) => {
                        return b.count - a.count;
                    }));
                      response(res, 200, true, 'Data Fetched Successfully',{data:Narr})
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

module.exports = topHistory