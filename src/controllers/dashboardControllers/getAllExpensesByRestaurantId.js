// const ExpenseType = require('../../models/expenseType')
const Expense = require('../../models/expense')
const response = require('../../utils/response')

const getAllExpensesRestaurantId = async (req, res) => {
    const {restaurantId,startDate,endDate} = req.query 
    const { _id, role } = req.userDetails
    try{
      const data=await Expense.
                find({
                    restaurantId,
                    $and:[{ date: { $gte:new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) 
                    } 
                }, { date: { $lte: new Date(endDate) } }]})
                .populate("expenseType")
              // console.log(data)
      if(data)
      {
        let result=[]
        Promise.all(data.map((ele)=>{
            obj={}
            obj.expense=ele.expenseType.expenseType
            obj.date=ele.date
            obj.amount=ele.amount
            result.push(obj)
          }))
        return response(res, 200, true, "All expenses fetched Successfully", {result})
      }else{
        return response(res, 200, true, "Expense not found", null)
      }
      
  }
  catch(error)
  {
    return response(res, 400, false, error.message, null)
  }
}

module.exports = getAllExpensesRestaurantId
