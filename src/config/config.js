/** @format */

/**
 * @description:
 * External dependencies
 * if NODE_ENV is not set, default to development environment
 * NODE_ENV: This is used to check the environment of node
 * Setting config files to environment variables
 */

const env = process.env.NODE_ENV || 'development' // Find the environment of node and set it to the env variable

// If the environment is development or test then set the config files to the environment variables
if (env === 'development' || env === 'test') {
  const config = require('./config.json')
  const envConfig = config[env]

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key]
  })
}
