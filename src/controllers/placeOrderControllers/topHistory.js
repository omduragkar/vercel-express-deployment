const response = require('../../utils/response')
const order = require('../../models/order')
const topHistory = async(req, res) => {
    const { restaurantId, startDate, endDate } = req.query;
    const userDetails = req.userDetails
    try {
        // let findUser = userDetails;
        // We need to check the userDetails have restaaurantId of that's being asked thus:
        let isAllowed = userDetails.restaurantLinked.includes(restaurantId);
        if (isAllowed) {
            const data = await order.
            find({
                    restaurantId,
                    $and: [{
                        createdAt: {
                            $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
                        }
                    }, { createdAt: { $lte: new Date(endDate) } }]
                })
                .populate({
                    path: "order",
                    populate: {
                        path: "menuId"
                    }
                })
            if (data) {

                //to count numbers of itemname occured between date
                var arr = []
                    // var count=0
                Promise.all(await data.map(async(element) => {
                    element.order.forEach((ele) => {
                        newItem = {
                                itemName: ele.menuId.itemName
                            }
                            // count++;
                        newItem.price = ele.menuId.price
                        arr.push(newItem)
                    })
                }))

                //to getting unique values of orders

                const uniqueObj = arr.reduce((obj, item) => {
                    const key = `${item.itemName}`;
                    obj[key] = obj[key] ? {...item, count: obj[key].count + 1 } : {...item, count: 1 };
                    return obj;
                }, {});

                const uniqueArr = Object.values(uniqueObj);

                Promise.all(await uniqueArr.map((ele) => {
                    ele.total = ele.price * ele.count
                }))

                //sort the values descending
                Promise.all(uniqueArr.sort((a, b) => {
                    return b.count - a.count;
                }));
                response(res, 200, true, 'Data Fetched Successfully', { data: uniqueArr })
            } else {
                response(res, 200, true, 'No data found', null)
            }
        } else {
            response(res, 500, false, 'Restricted Access Not Allowed', null)
        }

    } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Internal Server Error', { err: err.message })
    }
}

module.exports = topHistory