const Consumer = require('../../models/Consumer');
const response = require("../../utils/response");

const uploadUserInfo = async (req, res) => {
    const { restaurantId, orderId, name, mobileNumber, isSameWhatsappNumber, balanceAmount,dateOfBirth} = req.body;

    console.log("uploadUserInfo called");
    console.log({restaurantId, orderId, name, mobileNumber, isSameWhatsappNumber, balanceAmount,dateOfBirth});
    // console.log("The type of the balanceAmount is ", typeof(balanceAmount));

    
    try {
        const alreadyConsumer = await Consumer.findOne({mobileNumber: mobileNumber, restaurantId: restaurantId});
        if(alreadyConsumer){
            alreadyConsumer.name = name;
            alreadyConsumer.isSameWhatsappNumber = isSameWhatsappNumber;
            alreadyConsumer.balanceAmount = parseInt(balanceAmount, 10);
            alreadyConsumer.dateOfBirth=dateOfBirth;

            if(!alreadyConsumer.orders.includes(orderId)){
                alreadyConsumer.orders.push(orderId);
            }
            await alreadyConsumer.save();

            response(res, 200, true, "Consumer updated successfully", alreadyConsumer);
        }
        else{
            const newConsumer = new Consumer({
                name: name,
                mobileNumber: mobileNumber,
                dateOfBirth:dateOfBirth,
                isSameWhatsappNumber: isSameWhatsappNumber,
                balanceAmount: balanceAmount,
                restaurantId: restaurantId,
                orders: [orderId]
            });
            await newConsumer.save();

            response(res, 200, true, "Consumer created successfully", newConsumer);
        }
    } catch (error) {
        console.log(error);
        response(res, 500, false, "Internal server error", error);
        
    }

};

module.exports = uploadUserInfo;
