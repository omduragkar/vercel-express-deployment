const jwt = require('jsonwebtoken') // Import the jsonwebtoken module
const User = require('../models/user') // Import the user model
const response = require('../utils/response') // Import the response utility

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @description
 * Authenticate the user and set the user details
 * in the request object for further use in the middleware
 * chain and call the next middleware in the chain
 * if the user is authenticated successfully else return the error
 */

const Authenticate = function (req, res, next) {
  let jwtSecretKey = process.env.APPSETTING_APP_SECRET // Get the secret key from the environment variable
  const header = req.headers['authorization'] // Get the authorization header from the request
  try {
    if (header) {
      let token = header // Get the token from the header
      // Check if the token starts with Bearer then remove the Bearer from the token and set it to the token variable
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
      }
      // Verify the token and get the decoded payload
      jwt.verify(token, jwtSecretKey, (err, payload) => {
        const { mobileNumber, role } = payload // Get the mobile number and role from the payload
        if (!err) {
          // If there is no error in the token then get the user details from the database
          User.findOne({ mobileNumber, role }) // Find the user in the database
            .then(result => {
              if (!result) {
                return response(res, 401, false, 'Unauthorized', null) // If the user is not found then return the error
              } else {
                req.userDetails = result // If the user is found then set the user details in the request object
                next() // Call the next middleware
              }
            })
            .catch(err => {
              return response(res, 401, false, 'Unauthorized', { err }) // If there is an error in the database then return the error
            })
        } else {
          // Access Denied
          return response(res, 401, false, 'Unauthorized', null) // If there is an error in the token then return the error
        }
      })
    } else {
      return response(res, 401, false, 'Unauthorized', null) // If there is no token in the request then return the error
    }
  } catch (error) {
    console.log('🚀 ~ file: check-auth.js ~ line 54 ~ Authenticate ~ error', error)
    return response(res, 500, false, 'Internal Server Error', { err: error.message }) // If there is an error in the try block then return the error
  }
}

module.exports = { Authenticate } // Export the Authenticate function
