const response = require('../../utils/response');
const Table=require("../../models/Table");
const { ROLE } = require('../../constants/role');
const restaurant = require('../../models/restaurant');
const floor = require('../../models/floor');

module.exports.createFloor=async(req,res)=>{
    const {restaurantId, floorName}=req.body;
    const { role } = req.userDetails;
    try{
        const dataIp = [ROLE.OWNER, ROLE.CAPTAIN].includes(role);
        if(dataIp && floorName != "All"){
            const floorExist = await floor
            .findOne({$and:[{restaurantId}, {floorName}]})
            if(!floorExist){
                const floorCreate = await floor.create({
                    floorName,
                    restaurantId
                });
               if(floorCreate){
                    const updateRestro = await restaurant.findByIdAndUpdate(restaurantId, {
                        $push:{
                            floors:floorCreate._id
                        }
                    })
                    if(updateRestro) response(res,201,true,"Floor Created Successfully",floorCreate);
                    else response(res,400,false,"Not Able to create Request... Server Error",null);
                }else{
                    response(res,400,false,"Not Able to create Request... Server Error",null);
                }
            }else{
                response(res,400,false,"Floor Name Already Exists!",null);

            }
        }else{
            
            response(res,400,false,"You don't have Access for this! or have put value as All",null);
        }
        
    }catch(error)
    {
        response(res,400,false,error.message,error);
    }

}
