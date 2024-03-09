const { ROLE } = require('../../constants/role')
const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')

const rechargeRestaurantTrial = async (req, res) => {
  const { role, _id, mobileNumber } = req.userDetails
  try {
    if (role === ROLE.ADMIN) {
      const restaurant = await Restaurant.findOne({
        mobileNumber
      })
      if (restaurant) {
        const rechargeInfo= await recharge.create({
          rechargeValue:-1,
          rechargeStatus:true,
          rechargeValidity:"30 Days",
          rechargeType:"TRIAL",
          restaurantId:restaurant._id
        })
        const updatedRestro = await Restaurant.findByIdAndUpdate(
          restaurant._id,
        {
          rechargeInfo:rechargeInfo._id
        },{
          new:true
        }
        )
        return response(res, 200, true, 'Restaurant Trial Started', { restaurant: updatedRestro })
      } else {
        return response(res, 404, false, 'Restaurant Not Found', null)
      }
    } else {
      return response(res, 404, false, 'You are not a Vendor', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = rechargeRestaurantTrial
