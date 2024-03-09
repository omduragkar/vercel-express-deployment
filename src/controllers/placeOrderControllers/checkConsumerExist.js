const Consumer = require('../../models/Consumer');
const response = require("../../utils/response");

const checkConsumerExist = async (req, res) => {
    const { restaurantId,userMobileNumber,token} = req.body;

    // console.log("uploadUserInfo called");
    // console.log({restaurantId, userMobileNumber,token});
    // console.log("The type of the balanceAmount is ", typeof(balanceAmount));

    
    try {
        const alreadyConsumer = await Consumer.findOne({mobileNumber: userMobileNumber, restaurantId: restaurantId});
        if(alreadyConsumer){
            response(res, 200, true, "Consumer already exists", alreadyConsumer);
        }
        else{
            response(res, 500, false, "Consumer does not exists", {});
        }
    } catch (error) {
        console.log(error);
        response(res, 500, false, "Internal server error", error);
        
    }

};

module.exports = checkConsumerExist;
