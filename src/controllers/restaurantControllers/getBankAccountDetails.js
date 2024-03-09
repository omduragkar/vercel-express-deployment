const restaurant = require("../../models/restaurant");
const response = require("../../utils/response");

const getBankAccountDetails = async (req, res) => {

    const {
        mobileNumber,
        _id
    } = req.userDetails;
    try {
        const restro = await restaurant.findOne({mobileNumber})
        if (!restro) {
            return response(res, 400, false, "No Restaurant found", null)
        } else {
            return response(res, 200, true, 'Bank Account Details', {
                "bankAccountDetails": {
                    "restaurantName": restro.restaurantName,
                    "accountNumber": restro.accountNumber || "",
                    "ifscCode": restro.ifscCode || "",
                    "bankName": restro.bankName || ""
                }
            })
        }
    } catch (err) {
        return response(res, 500, false, 'Something Went Wrong', {
            error: err.message
        })
    }
}



module.exports = {
    getBankAccountDetails
};