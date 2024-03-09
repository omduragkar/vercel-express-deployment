const response = require("../../utils/response");
const User = require("../../models/user");
const { ROLE } = require("../../constants/role");
const Menu = require("../../models/menu");
const Table = require("../../models/Table");
const Order = require("../../models/order");
const restaurant = require("../../models/restaurant");
const { percentCalculator } = require("../../helper/percentCalculator");
const Variation = require("../../models/Variation");


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
          specialInstruction:"less spicy",
          item:{
            "selected":[]
          }
        }
      ],
      customer:{
        "name": "",
        "mobileNumber": "",
      }
    },
    billing:true
    orderType:"takaway/dinein"
  }

*/
const createOrder = async (req, res) => {
  const { restaurantId, order, billing = false, orderType, couponCode, isCouponClaimed, specialInstruction, tableId, oldOrderId, timeCreated} = req.body;
  let rolesAllowed = [ROLE.WAITER, ROLE.CAPTAIN, ROLE.OWNER]
  console.log(`The order creation time is ${timeCreated}`)
  // const { _id, role } = req.userDetails
  const userDetails = req.userDetails
  let resultRole = rolesAllowed.includes(userDetails?.role)
  try {
    if (resultRole) {
      let findingMenuIds = await order.map(ors => ors.menuId);

      let menuFind = await Menu.find({ _id: { $in: [...findingMenuIds] } });
      let restroValue = await restaurant.findById(restaurantId);
      let totalOrder = 0;
      let totalexcludegstOrder = 0;
      let gstValue = 0;
      let totalItem = 0;
      let variationPrice = 0;
      let newmenuwithTotal = [];
      for (let i = 0; i < order.length; i++) {
        let menuName = await menuFind.find(orde => orde._id == order[i].menuId);
        if(order[i]?.item?.selected){
          await Promise.all(order[i]?.item?.selected?.map(async selectedVAR => {
            await Promise.all(selectedVAR.variations.map(async selu => {
              let variationforMenu = await Variation.findById(selu._id);
              let newFindingMenu = await variationforMenu.variationOptions.find(elm => elm._id == selu.selected);
              console.log({ newFindingMenu, price: Number(!!newFindingMenu?.price ? newFindingMenu?.price: "0") });
              variationPrice += Number(!!newFindingMenu?.price ? newFindingMenu?.price: "0")
              console.log({ variationPrice });
              return selu;
            }))
            order[i].selected = order[i]?.item?.selected;
          }))
        }
        if (menuName) {
          if (menuName.ignoreTaxes) {
            totalexcludegstOrder += parseInt(menuName.price) * order[i].quantity;
          } else if (menuName.itemTax != "0") {
            totalexcludegstOrder += ((parseInt(menuName.price) * order[i].quantity) + percentCalculator(menuName.itemTax, parseInt(menuName.price) * order[i].quantity));
            gstValue += percentCalculator(parseInt(menuName.itemTax), parseInt(parseInt(menuName.price) * order[i].quantity));
          } else {
            totalOrder += parseInt(menuName.price) * order[i].quantity;
          }
          totalItem += order[i].quantity;
          order[i].cost = parseInt(menuName.price) * order[i].quantity;
          order[i].variationPrice = variationPrice;

        }
        newmenuwithTotal.push(order[i]);
      }
      const totalBeforeGST = totalOrder + variationPrice ;
      gstValue = percentCalculator((parseInt(restroValue.GstValue) || 5), totalOrder);
      totalOrder += totalexcludegstOrder + gstValue + variationPrice;
      // res.json({
      //   variationPrice,
      //   totalBeforeGST,
      //   totalOrder
      // })
      let status={};
      if(oldOrderId && oldOrderId != ""){

          status=await Order.findOne({
              _id:oldOrderId
          });
          let oldOrder = [...status.order]
          await oldOrder.map(oorder=>{
            let indexofNewOrder = newmenuwithTotal.findIndex(newOrder=>newOrder.menuId == oorder.menuId);
            console.log(indexofNewOrder);
            if(indexofNewOrder != -1){
              newmenuwithTotal[indexofNewOrder].isEdited = newmenuwithTotal[indexofNewOrder].quantity == oorder.quantity?false:true;
            }else{
              newmenuwithTotal.push({specialInstruction:oorder.specialInstruction,menuId:oorder.menuId, quantity:0, cost:0, isEdited:true});
            }
          })
          status=await Order.findOneAndUpdate({
            _id:oldOrderId
          } ,{
              order:newmenuwithTotal,
              orderStatus:billing?"BILLING":"CREATED",
              paymentStatus:false,
              orderAmount:{
                totalItem,
                orderBeforeAddingGSTValue:totalBeforeGST,
                orderExcludeGSTValue:totalexcludegstOrder,
                orderGst:gstValue,
                total:totalOrder,
                finalTotal:totalOrder
              },
              createdUser:userDetails?._id,
              orderType,
              specialInstruction
            },{
                new:true
            });

      }else{
          status=await Order.create({
            restaurantId,
            order:newmenuwithTotal,
            orderStatus:billing?"BILLING":"CREATED",
            paymentStatus:false,
            orderAmount:{
              totalItem,
              orderBeforeAddingGSTValue:totalBeforeGST,
              orderExcludeGSTValue:totalexcludegstOrder,
              orderGst:gstValue,
              total:totalOrder,
              finalTotal:totalOrder

            },
            createdUser:userDetails?._id,
            table:tableId,
            orderType,
            couponCode,
            isCouponClaimed,
            specialInstruction,
            timeCreated: timeCreated, // Set the 'timeCreated' field
          })

      }
      if(status){
        const tableOccupy=await Table.findOneAndUpdate({_id:tableId},{$set:{status:billing?"BILLING":"OCCUPIED", waiter:userDetails?._id, orderId:status._id}},{
          new:true
        });
        if(tableOccupy){
          if(oldOrderId){
            response(res, 200, true, "Order Updated Successfully", {tableStatus:tableOccupy, orderStatus:status, billing, timeCreated});

          }else{
            response(res, 200, true, "Order Created Successfully", {tableStatus:tableOccupy, orderStatus:status, billing, timeCreated});
          }
        }else{

          response(res, 400, "Error in adding it to table", {
            message:"Internal Server Issue"
          })

        }
      }else{
        response(res, 400, "Error in creating Order", {
          message:"Internal Server Issue"
        })
      }
    }
    else {
      response(res, 404, false, "Unauthorized Access", null);
    }

  } catch (err) {
    console.log(err);
    response(res, 400, false, "Error : ", {
      err: err
    })
  }
}

module.exports = createOrder