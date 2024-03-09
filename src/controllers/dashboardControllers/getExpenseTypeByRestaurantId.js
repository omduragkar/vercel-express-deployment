const ExpenseType = require('../../models/expenseType')
const response = require('../../utils/response')

const getExpenseTypeByRestaurantId = async (req, res) => {
    const {restaurantId} = req.query 
    const { _id } = req.userDetails
    try{
      const data=await ExpenseType.find({restaurantId})
      if(data)
      {
        return response(res, 200, true, "data fetched successfully", {getData:data})
      }
      else
      {
        return response(res, 200, false, "data not found", null)
      } 
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = getExpenseTypeByRestaurantId
