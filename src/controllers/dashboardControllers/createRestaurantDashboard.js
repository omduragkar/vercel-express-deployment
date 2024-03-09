const User = require('../../models/user')
const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')
const recharge = require('../../models/recharge')
const { findOneAndReplace } = require('../../models/user')

const createRestaurantDashboard = async (req, res) => {
  const { restaurantName, address, isGstRegistered, owner_ids, mobileNumber } = req.body
  const { openingTime, closingTime } = req.body
  const { accountNumber, bankName, ifscCode, GstValue } = req.body
  console.log("🚀 ~ file: createRestaurantDashboard.js:11 ~ createRestaurantDashboard ~ req.body", req.body)

  
  try {
    const restaurantDetails = await Restaurant.findOne({
      mobileNumber: mobileNumber
    })
    if (restaurantDetails) {
      return response(res, 200, false, 'Restaurant Already Exists for this Owner', null)
    } else {
      if (restaurantName && address && mobileNumber) {
        
        const restaurant = await Restaurant.create({
          restaurantName,
          mobileNumber,
          address,
          openingTime,
          closingTime,
          isGstRegistered,
          staff:[...owner_ids],
          accountNumber,
          bankName,
          ifscCode,
          GstValue,
          owner_ids,
        })
        if (restaurant) {
          let user =[];
          for(let i = 0;i<owner_ids.length ;i++){
            user.push(await User.findByIdAndUpdate(owner_ids[i],{
              $push:{restaurantLinked:restaurant._id}
            },
            {
              new:true
            }));
          
          }
          if (restaurant) {
            return response(res, 200, true, 'Restaurant Created Successfully', {
              restaurantId: restaurant._id,
              result: restaurant,
              user
            })
          } else {
            return response(res, 400, false, 'DB Error', null)
          }
        }
      } else {
        return response(res, 404, false, 'Missing Parameters', null)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = createRestaurantDashboard
