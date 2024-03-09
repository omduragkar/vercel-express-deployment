const ExpenseType = require('../../models/expenseType')
const response = require('../../utils/response')

const createAndUpdateExpenseType = async (req, res) => {
    const {restaurantId,edit=false,expenseTypeId,expenseType} = req.body 
    const { _id } = req.userDetails
    try{
      if(edit)
      {
        const updatedExpenseType=await ExpenseType.findByIdAndUpdate(expenseTypeId,{expenseType},{new:true});
        if(updatedExpenseType)
        {
            return response(res, 200, true, "Expense Type updated Successfully", {updatedExpenseType});
        }
        else{
          return response(res, 200, false, "Expense Type  not updated Successfully", null);
        }
      }
      else{
        const createExpenseType=new ExpenseType({
            restaurantId,
            expenseType
        });
        const createdExpenseType=await createExpenseType.save();
        if(createdExpenseType)
        {
            return response(res, 200, true, "Expense Type create Successfully", {createExpenseType});
        }
        else{
            return response(res, 200, false, "Expense Type cannot created", null)
        }
      } 
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = createAndUpdateExpenseType
