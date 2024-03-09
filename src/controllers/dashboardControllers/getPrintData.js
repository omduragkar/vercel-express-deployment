
const Bill = require("../../models/printer/biller");
const kot = require("../../models/printer/kot");
const restaurant = require("../../models/restaurant");
const response = require("../../utils/response");

const getPrintData = async (req, res) => {
    try {
      let { restaurantLinked = [] } = req.userDetails;
      let { restaurantId } = req.query;
      let isRestroExists = restaurantLinked.includes(restaurantId);
      if(isRestroExists){
        let restaurantData = await restaurant.findById(restaurantId).select("_id restaurantName address isGstRegistered GstValue openingTime closingTime mobileNumber isRestaurantActive print").populate("print.kot print.billing");
        if(restaurantData){
          console.log({pr:restaurantData.print && !restaurantData.print.kot, p:restaurantData.print })
          if(restaurantData.print && !restaurantData.print.kot){
            let newKot = await kot.create({
              restaurantId,
            })
            let billMaar = await Bill.create({
              restaurantId,
              restaurantName:restaurantData?.restaurantName || "",
              restaurantAddress:restaurantData?.address || "",
              restaurantMobileNumber:restaurantData?.mobileNumber || "",
              billEndMessage:"Thanks and Visit Again!"

            })
            restaurantData = await restaurant.findByIdAndUpdate(restaurantId, {
              print:{
                kot:newKot,
                billing:billMaar
              }
            },{
              new:true
            }).select("_id restaurantName address isGstRegistered GstValue openingTime closingTime isRestaurantActive print").populate("print.kot print.billing");
            response(res, 200, true, "True", {
              restaurantData
            })

          }else{
            response(res, 200, true, "True", {
              restaurantData
            })
          }
        }else{
          response(res, 400, false, 'Error: No restaurant Found! xErrorx1092', null);

        }

      }else{
        response(res, 400, false, 'Error: Not Allowed xErrorx1093', null);
      }
    } catch (err) {
      console.log(err);
      response(res, 400, false, 'Error Issue xErrorx1082', { err: err });
    }
  }
  
  module.exports = getPrintData