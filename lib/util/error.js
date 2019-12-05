'use strict'

const buildError = function (code, message) {
  const error = new Error()
  error.code = code
  error.success = false
  error.message = message
  return error
}

module.exports = {
  buildError
}
