const Expenses = require('../../models/expense')
const response = require('../../utils/response')

const getExpenseByRestaurantId = async (req, res) => {
    const {restaurantId} = req.query 
    const { _id } = req.userDetails

  try{
    const expenses=await Expenses.find({restaurantId}).populate("expenseType");
    if(expenses)
    {
        return response(res, 200, true,"Fetched all expenses Successfully", {expenses})
    }
    else{
        return response(res, 200, true,"Expenses not found",null)
    }
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = getExpenseByRestaurantId
