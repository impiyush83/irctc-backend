'use strict'

const Constants = {

  SERVER: {
    PORT: process.env.PORT || 3000
  },

  MONGO: {
    DATABASE: {
      NAME: 'irctc',
      CONNECTION_URI: process.env.MONGODB_URI || `mongodb://localhost/irctc`,
      TEST_CONNECTION_URI: `mongodb://localhost/irctc-test`
    }
  }
}

module.exports = Constants
