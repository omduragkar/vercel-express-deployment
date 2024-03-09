const generateTokens = require('../../helper/generateJWTtoken');
const { matchPassword } = require('../../helper/saltgenerator');
const User = require('../../models/user')
const response = require('../../utils/response')

const loginUser = async (req, res) => {
    const { mobileNumber, pin} = req.body;
  try {
    if(mobileNumber && pin){
        let findUser = await User.findOne({
            mobileNumber
        })
        if(findUser){
            
            if(await matchPassword(pin, findUser.pin))
            {
                let token = generateTokens({mobileNumber:findUser.mobileNumber, role:findUser.role, _id:findUser._id});
                let newFindUser = await User.findByIdAndUpdate(
                findUser._id,
                {
                    isLogin:true,
                    jwtToken:token
                },
                {
                    new:true
                }
                )

                return response(res, 200, true, "Success" , {
                    userLogged:newFindUser
                });
                
            }else{
            
                return response(res, 400, false, "Incorrect Pin" , {
                    mobileNumber:false,
                    pin:true
                });
            }
        }else{
            return response(res, 400, false, "Enter valid Mobile Number" , {
                mobileNumber:true,
                pin:true
            });
        }
    
    }else{
        return response(res, 400, false, 'Enter valid and Complete Details', {
            mobileNumber:true,
            pin:true
        })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', {
        err
    })
  }
}

module.exports = loginUser
