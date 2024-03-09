const ExpenseType = require('../../models/expenseType')
const response = require('../../utils/response')
const Expense=require("../../models/expense")

const deleteExpenseType = async (req, res) => {
    const {expenseTypeId} = req.body 
    const { _id } = req.userDetails
    try{
       const findExpenseType=await ExpenseType.findOne({_id:expenseTypeId});
       if(findExpenseType)
       {
        const deleteExpense=await Expense.deleteMany({expenseType:findExpenseType._id})
        if(deleteExpense)
        {
          const deleteExpenseType=await ExpenseType.findOneAndRemove({_id:expenseTypeId})
          if(deleteExpenseType)
          {
            return response(res, 200, true, "Expense Type deleted Successfully",{deleteExpenseType});
          }
          else
          {
            return response(res, 200, false, "Expense Type cannot deleted",null)
          }
          
        }
        else{
          return response(res, 200, false, "Expense Type cannot deleted",null);  
        }
        
       }
       else{
        return response(res, 200, false, "Expense Type not found",null);
       }
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = deleteExpenseType
