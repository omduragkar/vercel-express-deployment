const Consumer = require('../../models/Consumer')
const response = require('../../utils/response')

const getAllConsumers = async (req, res) => {
  try {
    const consumers = await Consumer.find({restaurantId:req.query.restaurantId})
    console.log(consumers, req.query);
    if (consumers) {
      return response(res, 200, true, 'User List', { consumers:consumers})
    } else {
      return response(res, 404, false, 'Consumers Not Found', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', null)
  }
}
module.exports = getAllConsumers
