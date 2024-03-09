const getRestName = restName => {
  const arr = restName?.split(' ')?.map(str => str[0])
  return `${arr[0] || ''}${arr[1] || ''}`
}

module.exports = getRestName
