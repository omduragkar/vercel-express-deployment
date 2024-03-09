const category = require('../../models/category')
const menu = require('../../models/menu')
const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')
const ObjectId = require('mongoose').Types.ObjectId

const deleteMenuById = async (req, res) => {
  const { role } = req.userDetails
  const { menuId, restaurantId } = req.body
  try {
    if (role === 'OWNER' || role == "CAPTAIN") {
      if (menuId && restaurantId) {
        // TODO: Check this query
        const isMenuIdPresent = await menu.findOneAndDelete(
          {
            _id: menuId,
          })

        if (isMenuIdPresent) {
          const pullCategory = await category.findOneAndUpdate(
            {
              _id: isMenuIdPresent?.categoryId
            },
            {
              $pull: {
                menu: menuId
              }
            },
            {
              new:true
            }
          ).populate("menu")
          if (pullCategory) {
            return response(res, 200, true, 'Menu Deleted Successfully', pullCategory);

          } else {
            return response(res, 400, false, 'Server Error. Unable to Delete Menu from Category At the moment.Contact Support (Error: x363)', null)
          }
        } else {
          return response(res, 400, false, 'Server Error Unable to Delete Menu At the moment.Contact Support (Error: x364)', null)
        }
      } else {
        return response(res, 400, false, 'Mandatory parameters are missing', null)
      }
    } else {
      return response(res, 400, false, 'Unauthorized', null)

    }
  } catch (err) {
    console.log('Log: ~> file: deleteMenuById.js ~> line 130 ~> deleteMenuById ~> err', err)
    return response(res, 500, false, 'Internal Server Error', err)
  }
}

module.exports = deleteMenuById
