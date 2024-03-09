const ApiUserRoles = require('../../models/apiUserRoles')
const response = require('../../utils/response')

const setApiRoles = async (req, res) => {
  try {
    const { apiPath, apiMethod, userRoles } = req.body

    const checkApi = await ApiUserRoles.findOne({
      apiPath,
      apiMethod
    })
    if (!checkApi) {
      const newApiUserRoles = new ApiUserRoles({
        apiPath,
        apiMethod,
        userRoles
      })
      await newApiUserRoles.save()
      return response(res, 200, true, 'Api User Roles Created Successfully', null)
    } else {
      return response(res, 200, true, 'Api User Roles Already Exists', null)
    }
  } catch (err) {
    console.log('🚀 ~ file: setApiRoles.js ~ line 35 ~ err', err)
    return response(res, 500, false, 'Internal Server Error', null)
  }
}

module.exports = setApiRoles
