/**
 *
 * @param {string} env
 * @description
 *    Returns true if the current environment is the same as the one passed in
 * @returns {boolean}
 */

const { ENVIRONMENT } = process.env
console.log('Log: ~> file: env.js ~> line 10 ~> process.env.ENVIRONMENT', process.env.ENVIRONMENT)

const isStaging = process.env.ENVIRONMENT === 'staging'
const isProduction = process.env.ENVIRONMENT === 'production'
const isLocal = process.env.ENVIRONMENT === 'local'
const isDev = process.env.ENVIRONMENT === 'development'

module.exports = { isStaging, isProduction, isLocal, isDev }
