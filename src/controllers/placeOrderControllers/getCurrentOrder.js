const response=require("../../utils/response");
const User=require("../../models/user");
const { ROLE } = require("../../constants/role");
const Menu=require("../../models/menu");
const Table=require("../../models/Table");
const Order=require("../../models/order");
const restaurant = require("../../models/restaurant");
const { percentCalculator } = require("../../helper/percentCalculator");
const order = require("../../models/order");


/*
  body:{
    token:""
    restaurantId:"21323",
    tableName:"T14",
    specialInstruction:"less spicy",
      order:[
        {
          menuId:"",
          quantity:"",
          specialInstruction:"less spicy"
        }
      ],
      customer:{
        "name": "",
        "mobileNumber": "",
      }
    }
    orderType:"takaway/dinein"
  }

*/
const getCurrentOrder = async (req, res) => {
  const { _id, role } = req.userDetails
  const { restaurantId } = req.query
  let rolesAllowed = [ROLE.CHEF, ROLE.CAPTAIN, ROLE.OWNER]
  let resultRole = rolesAllowed.includes(role)
  try{
    if(resultRole){
        let findingOrder = await order.find({$and:[{orderStatus:"CREATED"}, {restaurantId}]}).populate("table", "TableName").populate("order.menuId", "_id itemName");
        response(res, 200, true, "Success", {currentOrders:findingOrder})
    }else{
        response(res, 400, false, "UnAuthorized Access ", null)
        
    }
  }catch(err){
    console.log(err);
    response(res, 400, false, "Error ", {
      err:err
    })
  }
}

module.exports = getCurrentOrder