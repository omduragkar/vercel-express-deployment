const restaurant = require('../../models/restaurant')
const response = require('../../utils/response')

const getAllRestro = async (req, res) => {
  try {
    allRestro = await restaurant.find({})
    return response(res, 200, true, 'Success', allRestro)
  } catch (err) {
    return response(res, 404, false, 'Not Authorized', { err: err.message })
  }
}
const modifyRestroById = async (req, res)=>{
  const {restaurantId, updateData} = req.body

  try{
      if(updateData?.themeColor && updateData?.themeColor?.charAt(0)!="#"){
        
        updateData.themeColor = "#" + updateData.themeColor;
      }
      let {menu} = updateData;
      
      let offers = menu.filter(elm=>elm.isGift);
      offers = offers.map(elm=>{
        elm.giftItem = elm.menuItem
        return elm;
      })
      updateData.offers = offers
      updatedRestro = await restaurant.
      findByIdAndUpdate(restaurantId, updateData);

      if(updatedRestro){
        return response(res, 200, true, 'Success', updatedRestro)
      } else {
        return response(res, 404, false, 'Error in Updating', { err: 'NO' })
      }
    } catch (err) {
      console.log('Log: dashboardModifyEdit.js ~> line 29 ~> modifyRestroById ~> err', err)
      return response(res, 404, false, 'Not Authorized', { err: err.message })
    }
  }

const deleteRestroById = async (req, res) => {
  const { restaurantId } = req.body
  try {
    deletedRestro = await restaurant.findByIdAndDelete(restaurantId)
    return response(res, 200, true, 'Success', deletedRestro)
  } catch (err) {
    return response(res, 404, false, 'Not Authorized', { err: err.message })
  }
}

const pushOfferInRestaurant = async (isGift, restaurantId, result, menuItem, coins, restMenu) => {
  if (isGift && isGift !== 'false' && result.offers.length < 2) {
    await restaurant.updateOne(
      {
        _id: restaurantId
      },
      {
        $push: {
          offers: {
            giftItem: menuItem,
            coins,
            menuId: restMenu.menu[restMenu.menu.length - 1]._id // !ID changed to menu Id
          }
        }
      }
    )
  }
}
module.exports = {
  modifyRestroById,
  getAllRestro,
  deleteRestroById
}
