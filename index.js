'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Constants = require('./lib/constants')
const CityRoutes = require('./lib/routes/cityRoutes')
const CityConnectionRoutes = require('./lib/routes/cityConnectionRoutes')
const PathRoutes = require('./lib/routes/pathRoutes')
const MongoConnection = require('./lib/database/connect')

const _init = async function () {

  await MongoConnection.init()

  // Parse various different custom JSON types as JSON
  app.use(bodyParser.json({ type: 'application/json' }))

  // Connect all our routes to our application.
  app.use('/', CityRoutes)
  app.use('/', CityConnectionRoutes)
  app.use('/', PathRoutes)

  // Turn on the server.
  app.listen(Constants.SERVER.PORT, () => console.log(`App listening on port ${Constants.SERVER.PORT}`))
}

try {
  _init()
} catch (err) {
  console.log(`Something went wrong while starting up the server. Exiting.\nError: ${JSON.stringify(err)}`)

  // Note: If something goes wrong while starting up the server (like mongo connection failure),
  // then server startup is terminated explicitly.
  process.exit(1)
}
