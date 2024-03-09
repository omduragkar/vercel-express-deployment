const fs = require('fs')
const updateRestaurant = require('../../services/restaurant/updateRestaurant')
const response = require('../../utils/response')

const uploadRestaurantLogoById = async (req, res) => {
  const { restaurantId } = req.query
  const { originalname, filename, destination } = req.file
  const { _id } = req.userDetails
  try {
    if (restaurantId) {
      const logoImgExt = originalname.substring(originalname.lastIndexOf('.'))
      const restLogoImgName = restaurantId + '_Logo' + logoImgExt
      fs.renameSync(destination + '/' + filename, destination + '/' + restLogoImgName)
      const resultUpd = await updateRestaurant(restaurantId, _id, {
        restaurantLogoImage: destination + '/' + restLogoImgName
      })
      if (resultUpd?.n == 1 && resultUpd?.nModified == 1) {
        return response(res, 200, true, 'Logo Image Updated', { resultUpd })
      } else {
        return response(res, 404, false, 'Something Went wrong', { resultUpd })
      }
    } else {
      return response(res, 400, false, 'Mandatory Parameters are missing', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = uploadRestaurantLogoById
