const isYesterday = date => {
  const dateToCheck = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toDateString() === dateToCheck.toDateString()
}
module.exports = isYesterday
