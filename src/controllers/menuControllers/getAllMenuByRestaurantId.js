const response = require('../../utils/response')
const Restaurant = require('../../models/restaurant')
const Table = require('../../models/Table')
const category = require('../../models/category')

module.exports.getAllMenuByRestaurantId = async (req, res) => {
  let { restaurantId, tableId, edit } = req.query
  if(edit == undefined){
    edit = false;
  }
  try {
    let tableDetails = await Table.findById(tableId).populate({
      path: 'orderId',
      populate: {
        path: 'order',
        populate :{
          path: 'menuId',
          populate: {
            path: 'variations addons',
          }
        }
      },
  }).populate("waiter", "_id name role");
    if(tableDetails && tableDetails.status != "VACANT" && !edit){
      return response(res, 200, true, 'Order Details According to Table Fetched Successfully', {tableReserved:true , tableDetails})

    }else{
      category.find({ restaurantId }).populate({
        path: 'menu',
        populate: {
          path: 'variations addons',
        }
      }).exec(function(err, category) { 
          if(err){
            return response(res, 400, false, 'Restaurant Not Valid', null)
          }
          if(category & !edit){
            return response(res, 200, true, 'Menu Details Fetched Successfully', {tableReserved:false , category})
          }
          if(category && edit){
            return response(res, 200, true, 'Menu Details Fetched Successfully', {tableReserved:true , category, tableDetails})
          }
          else{
            return response(res, 400, false, 'No Category Exists for the above Restaurant', {category:true})
            
          }
          // your code here
      })

    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports.getCategoryMenuByRestaurant = async (req, res) => {
  let { restaurantId } = req.query
  
  try {
    
      let cate = await category.find({ restaurantId }).populate({
        path: 'menu',
        populate: {
          path: 'variations addons',
        }
      })
      if(cate){
        return response(res, 200, true, 'Menu Details Fetched Successfully', {category:cate})
      }
      else{
        return response(res, 400, false, 'No Category Exists for the above Restaurant', {category:true})
        
      }
          // your code here
     
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}
