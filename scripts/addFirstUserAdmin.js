const mongoose = require('mongoose')
const User = require('../src/models/user')
const { ROLE } = require('../src/constants/role')
const generateTokens = require('../src/helper/generateJWTtoken')
const { generateSalt } = require('../src/helper/saltgenerator')

mongoose.connect('mongodb+srv://etoposdbtest:etopos@123456@cluster0.dm3bzlm.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const addFirstUserAdmin = async () => {
  const mobileNumber = '8459162509'
  const admin = await User.create({
    name: mobileNumber + '_ADMIN',
    pin: await generateSalt("123456"),
    mobileNumber: mobileNumber,
    role:ROLE.ADMIN,
    isLogin: true,
  })
  if(admin){
    let newAdminDetails = await User.findByIdAndUpdate(
      admin._id,
      {
        jwtToken:generateTokens({mobileNumber, role:ROLE.ADMIN, _id:admin._id})
      },
      {new:true}
    )
    console.log('Admin added successfully', newAdminDetails)
  }else{
    
    console.log('Unable to make Admin')
  }
}

addFirstUserAdmin()
