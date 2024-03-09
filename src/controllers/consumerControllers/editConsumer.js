const response = require('../../utils/response')
const { ROLE } = require('../../constants/role')
const User = require('../../models/user')
const { generateSalt } = require('../../helper/saltgenerator')
const Consumer = require('../../models/Consumer')



const editConsumer = async (req, res) => {
  const { role, restaurantLinked,_id} = req.userDetails
  const { userData } = req.body
  const {restaurantId,mobileNumber,name,isSameWhatsappNumber,balanceAmount,dateOfBirth} = userData;

  console.log({
    userData
  })

  try {
    const ConsumerExist = await Consumer.findOne({ mobileNumber, restaurantId });
    // console.log(ConsumerExist);

    if(ConsumerExist){
      const updatedConsumer = await Consumer.findByIdAndUpdate(ConsumerExist._id,{
        name:name ?? ConsumerExist.name,
        mobileNumber:mobileNumber ?? ConsumerExist.mobileNumber,
        dateOfBirth:dateOfBirth ?? ConsumerExist.dateOfBirth,
        isSameWhatsappNumber:isSameWhatsappNumber ?? ConsumerExist.isSameWhatsappNumber,
        balanceAmount:balanceAmount ?? ConsumerExist.balanceAmount,
      },{new:true});
      return response(res, 200, true, 'Consumer Updated Successfully', { updatedConsumer })
    }
    else{
      return response(res, 404, false, 'Consumer Not Found', null)
    }
  } catch (error) {
    return response(res, 400, false, 'Something went wrong', { error: error.message })
  }
}

module.exports = editConsumer