const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const User = require('../models/user')
const { ROLE } = require('../constants/role')
/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @description
 * Authenticate the admin and set the admin details
 * in the request object for further use in the middleware
 * chain and call the next middleware in the chain
 * if the admin is authenticated successfully else return the error
 */

const AuthenticateAdmin = async (req, res, next) => {
  const jwtSecretKey = process.env.APPSETTING_APP_SECRET // Get the secret key from the environment variable

  try {
    if (req.headers['authorization']) {
      let token = req.headers['authorization']
      // Check if the token starts with Bearer then remove the Bearer from the token
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
      }
      // Verify the token and get the decoded payload
      jwt.verify(token, jwtSecretKey, (err, payload) => {
        if (!err) {
          // If there is no error in the token then get the admin details from the database
          User.findOne({
            mobileNumber: payload.mobileNumber,
            role: ROLE.ADMIN
          })
            .then(result => {
              if (!result) {
                return response(res, 401, false, 'Unauthorized User Not found', null) // If the admin is not found then return the error
              } else {
                req.userDetails = result // If the admin is found then set the admin details in the request object
                next() // Call the next middleware
              }
            })
            .catch(err => {
              return response(res, 401, false, 'Unauthorized', { err: err.message }) // If there is an error in the database then return the error
            })
        } else {
          return response(res, 401, false, 'Unauthorized Invalid Token', null) // If there is an error in the token then return the error
        }
      })
    } else {
      return response(res, 401, false, 'Unauthorized No Token', null) // If there is no token in the request then return the error
    }
  } catch (error) {
    console.log('Log: ~> file: checkAdminAuth.js ~> line 55 ~> AuthenticateAdmin ~> error', error)
    return response(res, 500, false, 'Internal Server Error', { err: error.message }) // If there is an error in the try block then return the error
  }
}

module.exports = { AuthenticateAdmin }
