const response = require('../../utils/response');
const Table=require("../../models/Table");
const { ROLE } = require('../../constants/role');
const floor = require('../../models/floor');

const showTablesByRestaurantId=async(req,res)=>{
    const {restaurantId}=req.query;
    const { role } = req.userDetails;
    try{
        const dataIp = [ROLE.OWNER, ROLE.CAPTAIN, ROLE.WAITER].includes(role);
        if(dataIp){
            const flooring = await floor.find({restaurantId:restaurantId}).populate({
                path: 'tables',
                populate: {
                    path: 'waiter',
                    model: 'User',
                }
            });
            response(res,201,true,"Tables Fetched Successfully",flooring);
        }else{
            
            response(res,201,false,"You don't have Access for this!",null);
        }
        
    }catch(error)
    {
        response(res,400,false,error.message,error);
    }

}

module.exports=showTablesByRestaurantId

// const showTablesByRestaurantId=async(req,res)=>{
//     const {restaurantId}=req.query;
//     const { role } = req.userDetails;
//     try{
//         const dataIp = [ROLE.OWNER, ROLE.CAPTAIN, ROLE.WAITER].includes(role);
//         if(dataIp){
//             const flooring = await floor.find({restaurantId:restaurantId}).populate("tables");
//             let newcustomFlooring =[{
//                 "tables": [],
//                 "_id": "1234zero",
//                 "floorName": "All",
//                 "restaurantId": "63c7ae01b9c02e2748959f10"
//             }];
//             for(let i = 0;i<flooring.length;i++){
//                 flooring[i].tables.map(us=>newcustomFlooring[0].tables.push(us));
//             }
//             newcustomFlooring = [...newcustomFlooring, ...flooring];
//             console.log(newcustomFlooring)
//             response(res,201,true,"Tables Fetched Successfully",{flooring:newcustomFlooring});
//         }else{
            
//             response(res,201,false,"You don't have Access for this!",null);
//         }
        
//     }catch(error)
//     {
//         response(res,400,false,error.message,error);
//     }

// }