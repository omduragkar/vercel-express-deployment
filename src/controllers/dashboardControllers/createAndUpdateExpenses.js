const Expenses = require('../../models/expense')
const response = require('../../utils/response')

const createAndUpdateExpenses = async (req, res) => {
    const {expenseId,restaurantId,expenseType,amount,date,specialInstruction,edit=false,assigneeId} = req.body 
    const { _id } = req.userDetails
    try{
      if(edit)
      {
        const updateExpense=await Expenses.findByIdAndUpdate(expenseId,{expenseType,amount,date,specialInstruction},{new:true});
          if(updateExpense)
          {
            return response(res, 200, true, 'Expense updated successfully', { updateExpense })
          }
          else{
            return response(res, 200, false, 'Expense not found', null)
          }
      }
      else{

        const createExpense = new Expenses({
          createdBy:_id,
          restaurantId,
          expenseType,
          amount,
          date,
          specialInstruction,
          assigneeId
        })
        const createExpenses = await createExpense.save();
        if(createExpenses)
        {
          return response(res, 200, true, 'Expense created successfully', { createExpense })
        }
        else
        {
          return response(res, 400, false, 'Expense not created', null)
        }
      }
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = createAndUpdateExpenses
