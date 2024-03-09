const Coupon = require('../src/models/coupon')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Lazar786:Menucart786@cluster0.sny7p.mongodb.net/socon-production', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const addLogsOfCampusAmbassadorCoupon = async (req, res) => {
  try {
    const findAllCampusAmbassadorCoupons = await Coupon.find({
      isCampusAmbassadorCoupon: true
    })
  } catch (error) {
    console.log(error)
  }
}
