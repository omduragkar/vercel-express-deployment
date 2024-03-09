const getFileName = originalName => {
  const ext = originalName?.substr(originalName.lastIndexOf('.') + 1)
  const name = originalName?.substr(0, originalName.lastIndexOf('.'))

  return `${name?.replace(/\W+/g, '_') || ''}.${ext}`
}

module.exports = getFileName
