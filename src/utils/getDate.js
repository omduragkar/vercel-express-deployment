/**
 *
 * @param {Date} endDate
 * @returns
 */

const getDate = endDate =>
  new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).toISOString().split('T')[0]

module.exports = getDate
