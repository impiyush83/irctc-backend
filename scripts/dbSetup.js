const cities = require('./cities.json')
const cityconnections = require('./cityconnections.json')
const MongoConnection = require('../lib/database/connect')
const dbCity = require('../lib/database/models/city')
const dbCityConnection = require('../lib/database/models/cityConnections')

const addCity = async function (cityObj, cityConnectionsObj) {
  // clear entries
  await dbCity.cities.deleteMany()

  // insert many
  await dbCity.cities.insertMany(cityObj)
}

const addCityConnection = async function (cityConnectionsObj) {
  // clear entries
  await dbCityConnection.cityConnections.deleteMany()

  // insert many
  await dbCityConnection.cityConnections.insertMany(cityConnectionsObj)
}

const init = async () => {
  await MongoConnection.init()
  await addCity(cities)
  await addCityConnection(cityconnections)
}

init().then(() => {
  console.log('setup success')
  process.exit(1)
}).catch((err) => {
  console.log(`error in setup: ${err}`)
  process.exit(1)
})
