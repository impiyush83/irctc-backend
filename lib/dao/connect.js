'use strict'

const mongoose = require('mongoose')
const Constants = require('../constants')

const init = async function (isTestDb) {

  const connectionURI = isTestDb ? Constants.MONGO.DATABASE.TEST_CONNECTION_URI : Constants.MONGO.DATABASE.CONNECTION_URI

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    'useCreateIndex': true
  }
  await mongoose.connect(connectionURI, options)

  // Use native promises for mongoose.
  mongoose.Promise = global.Promise
}

const getClient = function () {
  return mongoose
}

module.exports = {
  init,
  getClient
}
