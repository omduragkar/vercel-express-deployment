const response = require('../../utils/response');
const Table=require("../../models/Table");
const { ROLE } = require('../../constants/role');
const restaurant = require('../../models/restaurant');
const floor = require('../../models/floor');

module.exports.addTablesByRestaurantId=async(req,res)=>{
    const {restaurantId, TableName, floorId,tableCapacity}=req.body;
    const { role } = req.userDetails;
    try{
        const dataIp = [ROLE.OWNER, ROLE.CAPTAIN].includes(role);
        if(dataIp){
            let floorExist = await floor.findById(floorId);
            if(floorExist){
                const tableExist = await Table.findOne({$and:[{TableName}, {restaurantId}]});
                if(!tableExist){
                    const newTable = await Table.create({
                        TableName,
                        tableCapacity,
                        restaurantId,
                        floor:floorId
                    })
                    if(newTable){
                        let addTabletoFloor = await floor.findByIdAndUpdate(floorId, {$push:{tables:newTable._id}}, {new:true}).populate("tables");
                        if(addTabletoFloor){
                            response(res,201,true,"Tables Created Successfully",{addTabletoFloor,newTable});

                        }else{
                            response(res,400,false,"Error in creating ",null);
                        }

                    }else{
                        response(res,400,false,"Error in creating ",null);

                    }
                }else{
    
                    response(res,400,false,"Same Name Alreay Exist. Please try Diffrent Name",null);
                }
            }else{
                response(res,400,false,"Please Add Floor First to continue",null);

            }
        }else{
            
            response(res,400,false,"You don't have Access for this!",null);
        }
        
    }catch(error)
    {
        response(res,400,false,error.message,error, {error});
    }

}
