const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')
const Consumer = require('../../models/Consumer')

const deleteConsumer = async (req, res) => {
  const { userData } = req.body
  const {restaurantId,mobileNumber} = userData;

  console.log({
    userData
  })
  
  try {
    const ConsumerExist = await Consumer.findOne({ mobileNumber, restaurantId });
    console.log(ConsumerExist);

    if(ConsumerExist){
      const deletedConsumer = await Consumer.findByIdAndDelete(ConsumerExist._id);
      return response(res, 200, true, 'Consumer Deleted Successfully', { deletedConsumer })
    }
    else{
      return response(res, 404, false, 'Consumer Not Found', null)
    }
  } catch (error) {
    return response(res, 400, false, 'Something went wrong', { error: error.message })
  }
}

module.exports = deleteConsumer