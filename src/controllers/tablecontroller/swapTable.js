const Table = require("../../models/Table");
const order = require("../../models/order");
const response = require('../../utils/response');

module.exports.swapTable = async (req, res)=>{
    const {oldTableId, newTableId} = req.body;
    const {_id} = req.userDetails;
    try {
        if(oldTableId && newTableId){
            const tableDetails = await Table.find({
                "_id" : { "$in" : [   oldTableId, newTableId]}
            });
            let oldTableDetails = null;
            let newTableDetails = null;
            for(let i = 0 ; i < tableDetails.length ;i++){
                if(tableDetails[i]._id == oldTableId)
                {
                    oldTableDetails = tableDetails[i];
                }else{
                    newTableDetails = tableDetails[i];
                }
            }
            console.log(tableDetails, newTableDetails, oldTableDetails);
            if(oldTableDetails.status != "OCCUPIED"){
    
                response(res, 400, false, "Old Table not Occupied Errorx5031", null);
            }else if(newTableDetails.status != "VACANT"){
    
                response(res, 400, false, "New Selected Table not Vacant Errorx5032", null);
            }else{
                let newTableOccupied = await Table.findByIdAndUpdate(newTableId, {
                    orderId:oldTableDetails.orderId,
                    waiter:_id,
                    status:"OCCUPIED"
                },{
                    new:true
                })
                if(newTableOccupied){
                    let changeOldTableOrder = await Table.findByIdAndUpdate(oldTableId, {
                        orderId:null,
                        waiter:null,
                        status:"VACANT"
                    })
                    let orderUpdate = await order.findByIdAndUpdate(oldTableDetails.orderId, {
                        table:newTableOccupied._id
                    })
                    response(res, 200, true, "Success", {orderUpdate, changeOldTableOrder,newTableOccupied });
                }else{
                    // console.log(newTableOccupied , newTableOccupied.orderId ==oldTableDetails.orderId )

                    response(res, 500, false, "Not able to swap Order Errorx5033", null);
                }
    
            }
        }else{
            response(res, 400, false, "Missing Parameters. Please add Where to shift! Errorx5034", null )
        }
    } catch (error) {
        console.log(error)
        response(res, 500, false, "Error in API Errorx5035", error )
        
    }
    
}