const response = require('../../utils/response');
const { ROLE } = require("../../constants/role");
const Table=require("../../models/Table");
const user=require("../../models/user");

const {_id}=req.body
const showVacantTable=async(req,res)=>{
    const waiter=user.findOne({_id});
    try{
        if(user.role===ROLE.WAITER)
        {
            const Tables=await Table.findOne({vacant:"VACANT"});
            response(res,201,true,"Fetched Successfully",Tables);
                
        }else{
            response(res,401,false,"Unauthorized Access",null);
        } 

    }
    catch(error)
    {
        return response(res, 400, false, error.message, null)
    }
       
}

module.exports=showVacantTable