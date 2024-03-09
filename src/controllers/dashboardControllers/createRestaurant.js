const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')
const generateUniqueId = require('../../helper/generateUniqueId')
const user = require('../../models/user')
const createMenuByRestaurantId = require('../../utils/addMenuandOffer')

const createRestaurant = async (req, res) => {
  const { role, _id } = req.userDetails
  let {
    restaurantName,
    address,
    themeColor,
    isGstRegistered,
    openingTime,
    packagingSmallCharges,
    closingTime,
    discount,
    packagingMediumCharges,
    packagingLargeCharges,
    coins,
    mobileNumber,
    ifscCode,
    bankName,
    accountNumber,
    menu,
    offers
  } = req.body

  const uniqueId = await generateUniqueId(restaurantName)
  // Add req.files
  if (true) {
    const tokenImage = 'https://socon-staging.vercel.app/image/svg/logo_green.png',
      logoImage = 'https://socon-staging.vercel.app/image/svg/logo_green.png'

    try {
      if (role === 'ADMIN') {
        let findingUser = await createUser(mobileNumber)
        const restaurantDetails = await Restaurant.findOne({
          mobileNumber,
          owner_id: findingUser._id
        })

        if (restaurantDetails) {
          return response(res, 400, false, 'Restaurant Already Exists', null)
        } else {
          // Menu function call
          // Save Restaurant first
          if (restaurantName && address && openingTime && closingTime && accountNumber && bankName && ifscCode) {
            const restaurant = new Restaurant({
              restaurantName,
              address,
              uniqueId,
              createdBy: findingUser._id,
              restaurantTokenImage: tokenImage || '',
              restaurantLogoImage: logoImage || '',
              coins: coins ?? 0,
              themeColor: `#${themeColor}`,
              openingTime,
              closingTime,
              discount: discount ?? 0,
              isGstRegistered,
              createdByOwner: false,
              packagingCharges: {
                small: packagingSmallCharges ?? 0,
                medium: packagingMediumCharges ?? 0,
                large: packagingLargeCharges ?? 0
              },
              mobileNumber,
              owner_id: findingUser._id,
              accountNumber,
              ifscCode,
              bankName
            })

            const saveRecord = await restaurant.save()
            if (saveRecord) {
              let restaurantDetails = await Restaurant.findOne({
                _id: saveRecord._id,
                createdBy: findingUser._id
              })
              let statusBool = true
              if (restaurantDetails) {
                for (let i = 0; i < menu.length; i++) {
                  let { status, message } = await createMenuByRestaurantId(role, restaurantDetails._id, menu[i])
                  // console.log(status, message)
                  if (status) {
                    continue
                  } else {
                    statusBool = false
                    return response(res, 404, false, 'Missing Parameters', message, null)
                  }
                }
                if (statusBool) {
                  restaurantDetails = await Restaurant.findOne({
                    _id: saveRecord._id
                  })
                  return response(res, 200, true, 'Restaurant Created Successfully', {
                    restaurantId: saveRecord._id,
                    restaurantDetails
                  })
                } else {
                  return response(res, 404, false, 'Missing Parameters', null)
                }
              } else {
                return response(res, 400, false, 'DB Error', null)
              }
            }
          } else {
            return response(res, 404, false, 'Missing Parameters', null)
          }
        }
      } else {
        return response(res, 400, false, 'Not Authorized', null)
      }
    } catch (err) {
      console.log(err)
      return response(res, 500, false, 'Internal Server Error', { err: err.message })
    }
  } else {
    return response(res, 500, false, 'Please Upload Image', null)
  }
}

const createUser = async mobileNumber => {
  const findingUser = await user.findOne({ mobileNumber })
  if (!findingUser) {
    let newVendor = await user.create({
      mobileNumber,
      userName: `${mobileNumber}_VENDOR`,
      role: 'VENDOR',
      isLogin: false
    })
    return newVendor
  } else {
    return findingUser
  }
}
module.exports = createRestaurant
