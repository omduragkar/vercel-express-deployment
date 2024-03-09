const ExpenseType = require('../../models/expenseType')
const response = require('../../utils/response')

const deleteExpenseType = async (req, res) => {
    const {expenseTypeId} = req.body 
    const { _id } = req.userDetails
    try{
       const deleteExpenseType=await ExpenseType.findOneAndRemove({_id:expenseTypeId});
       if(deleteExpenseType)
       {
        return response(res, 200, true, "Expense Type deleted Successfully",null);
       }
       else{
        return response(res, 200, false, "Expense Type cannot deleted",null);
       }
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = deleteExpenseType
