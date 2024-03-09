const ApiUserRoles = require('../models/apiUserRoles')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const { dashboardUsers, normalUsers } = require('../constants/userTypes')
const DashboardUsers = require('../models/dashboardUsers')
const User = require('../models/user')

const verifyUserWithRole = async (req, res, next) => {
  try {
    const header = req.headers['authorization']
    if (header) {
      let token = header
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
      }
      jwt.verify(token, process.env.APPSETTING_APP_SECRET, async (err, payload) => {
        if (err) {
          return response(res, 401, false, 'Unauthorized Token', null)
        } else {
          let apiPathName = req.originalUrl
          if (req.hostname.startsWith('/api')) {
            apiPathName = apiPathName.replace('/api/', '/')
          }
          const apiMethodName = req.method
          const role = payload.role
          const mobileNumber = payload.mobileNumber
          const checkApi = await ApiUserRoles.findOne({
            apiPath: apiPathName,
            apiMethod: apiMethodName,
            userRoles: { $in: [role] }
          })
          if (checkApi) {
            if (dashboardUsers.includes(role)) {
              DashboardUsers.findOne({ mobileNumber, role })
                .then(result => {
                  if (result) {
                    req.userDetails = result
                    next()
                  } else {
                    return response(res, 401, false, 'Unauthorized', null)
                  }
                })
                .catch(err => {
                  console.log('🚀 ~ file: verifyUserWithRole.js ~ line 64 ~ err', err)
                  return response(res, 401, false, 'Unauthorized User Not found', { err: err.message })
                })
            } else if (normalUsers.includes(role)) {
              User.findOne({ mobileNumber })
                .then(result => {
                  if (result) {
                    req.userDetails = result
                    next()
                  } else {
                    return response(res, 401, false, 'User Not found', null)
                  }
                })
                .catch(err => {
                  console.log('🚀 ~ file: verifyUserWithRole.js ~ line 72 ~ err', err)
                  return response(res, 404, false, 'Error finding user', { err: err.message })
                })
            }
          } else {
            return response(res, 401, false, 'Unauthorized', null)
          }
        }
      })
    } else {
      return response(res, 401, false, 'Unauthorized', null)
    }
  } catch (err) {}
}

module.exports = verifyUserWithRole
