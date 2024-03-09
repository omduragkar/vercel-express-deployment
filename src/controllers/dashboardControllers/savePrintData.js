
const Bill = require("../../models/printer/biller");
const kotWar = require("../../models/printer/kot");
const restaurant = require("../../models/restaurant");
const response = require("../../utils/response");

const savePrintData = async (req, res) => {
    try {
        let { restaurantLinked = [] } = req.userDetails;
        let { restaurantId, kot, billing } = req.body;
        let isRestroExists = restaurantLinked.includes(restaurantId);
        if (isRestroExists) {
            let restaurantData = await restaurant.findById(restaurantId).populate("print.kot print.billing");
            if (restaurantData) {
                let BillingUpdate = await Bill.findOneAndUpdate({
                    _id: billing?._id
                }, {
                    ...billing
                })
                let kotUpdate = await kotWar.findOneAndUpdate({
                    _id: kot?._id
                }, {
                    ...kot
                })
                restaurantData = await restaurant.findById(restaurantId).populate("print.kot print.billing");
                response(res, 200, true, 'Done!', {
                    restaurantData
                });

            } else {
                response(res, 400, false, 'Error: No restaurant Found! xErrorx1092', null);

            }

        } else {
            response(res, 400, false, 'Error: Not Allowed xErrorx1093', null);
        }
    } catch (err) {
        console.log(err);
        response(res, 400, false, 'Error Issue xErrorx1082', { err: err });
    }
}

module.exports = savePrintData