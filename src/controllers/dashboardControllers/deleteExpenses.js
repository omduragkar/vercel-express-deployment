const Expenses = require('../../models/expense')
const response = require('../../utils/response')


const deleteExpenses = async (req, res) => {
  const {expenseId,restaurantId} = req.body 
  const { _id } = req.userDetails
  try{
    const findExpense=await Expenses.findById(expenseId);
      if(findExpense.createdBy==_id)
      {
        const deleteExpense=await Expenses.findOneAndRemove({_id:expenseId});
        if(deleteExpense)
        {
          return response(res, 200, true, 'Expense deleted successfully',null)
        }
        else{
          return response(res, 200, false, 'Expense not found', null)
        }
      }
      else
      {
        return response(res, 200, false, 'Expense cannot be not deleted,unauthorized', null)
      }
}
catch(error)
{
  return response(res, 400, false, error.message, null)
}
}

module.exports = deleteExpenses
