const restaurant = require('../models/restaurant')

const createMenuByRestaurantId = async (role, restaurantId, menuObj) => {
  try {
    let { menuItem, price, coins, excludeMe, isGift, menuItemImage, menuItemImageName } = menuObj

    if (role === 'VENDOR' || role === 'ADMIN') {
      if (restaurantId && menuItem && price) {
        const result = await restaurant.findById(restaurantId)

        if (result) {
          const menuResult = await restaurant.findOne(
            {
              _id: restaurantId,
              'menu.menuItem': menuItem,
              'menu.price': price,
              'menu.isAvailable': true,
              'menu.excludeMe': excludeMe ?? true
            },
            {
              'menu.$': 1
            }
          )

          if (menuResult) {
            return { code: 400, status: false, message: 'Menu Already Exists', data: null }
          } else {
            const restMenu = await restaurant.findOneAndUpdate(
              {
                _id: restaurantId
              },
              {
                $push: {
                  menu: {
                    menuItem,
                    price,
                    coins,
                    menuItemImage,
                    isGift: isGift ?? false,
                    menuItemImageName,
                    isAvailable: true,
                    excludeMe: excludeMe
                  }
                }
              },
              { new: true }
            )
            if (restMenu) {
              if (isGift) {
                await pushOfferInRestaurant(isGift, restaurantId, restMenu, menuObj)
                return {
                  code: 200,
                  status: true,
                  message: 'Menu Created Successfully',
                  data: {
                    menuResult: restMenu
                  }
                }
              } else {
                return {
                  code: 200,
                  status: true,
                  message: 'Menu Created Successfully',
                  data: {
                    menuResult: restMenu
                  }
                }
              }
            } else {
              return {
                code: 500,
                status: false,
                message: 'Gifts already are 2',
                data: null
              }
              //  response(res, 500, false, 'Gifts already are 2', null)
            }
          }
        } else {
          const message =
            'something went wrong, db error, you may not the owner of this restaurant to perform menu creation operation'
          //   return response(res, 404, false, message, result)
          return {
            code: 404,
            status: false,
            message,
            data: result
          }
        }
      } else {
        const message = 'Something Went Wrong while Fetching Restaurant Details'
        return {
          code: 404,
          status: false,
          message,
          data: null
        }
      }
    } else {
      //    return response(res, 402, false, 'Not Authorized to create menu', null)
      return {
        code: 402,
        status: false,
        message: 'Not Authorized to create menu',
        data: null
      }
    }
  } catch (err) {
    console.log('🚀 ~ file: createMenuByRestaurantId.js ~ createMenuByRestaurantId ~ err', err)
    return {
      code: 500,
      status: false,
      message: 'Internal Server Error',
      data: { err: err.message }
    }
  }
}
const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://Lazar786:Menucart786@cluster0.sny7p.mongodb.net/socon-production', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// createMenuByRestaurantId(
//     "ADMIN",
//     "627b897e01392e0d48d8e86a",
//     {
//         "menuItem": "Puri",
//         "price": "20",
//         "isGift": true
//     }

// ).then(res=>{
//     console.log(res);
// })

const pushOfferInRestaurant = async (isGift, restaurantId, result, menuObj) => {
  if (isGift && isGift !== 'false' && result.offers.length < 2) {
    await restaurant.updateOne(
      {
        _id: restaurantId
      },
      {
        $push: {
          offers: {
            giftItem: menuObj.menuItem,
            coins: menuObj.coins || 0,
            menuId: result.menu[result.menu.length - 1]._id // !ID changed to menu Id
          }
        }
      }
    )
  }
}

module.exports = createMenuByRestaurantId
