const db = require('../database/models/cityConnections')
const ErrorUtil = require('./../util/error')
const _ = require('ramda')
const CityDao = require('../database/cityDao')

// controller to add city connection
const addCityConnection = async (cityConnection) => {
  const City1 = cityConnection.point1
  const City2 = cityConnection.point2

  // check if city1 exists
  const city1 = await CityDao.getCityByCityName(City1)

  if (_.isNil(city1)) {
    return Promise.reject(ErrorUtil.buildError(400, 'City1 does not exists'))
  }
  // check if city2 exists
  const city2 = await CityDao.getCityByCityName(City2)

  if (_.isNil(city2)) {
    return Promise.reject(ErrorUtil.buildError(400, 'City2 does not exists'))
  }
  // check if cityconnection already exists
  const CityConnection = await db.cityConnections.findOne({
    'source': City1,
    'destination': City2
  })
  // if cityconnection exists return conflict error
  if (CityConnection) {
    return Promise.reject(ErrorUtil.buildError(409, 'City Connection already exists'))
  }

  // add city connections if not present
  const cityConnections = [
    {'source': City1, 'destination': City2, 'cost': cityConnection.cost},
    {'source': City2, 'destination': City1, 'cost': cityConnection.cost}
  ]

  // add cityconnections
  await db.cityConnections.create(cityConnections).catch((err) => {
    console.log(err)
  })

  //  controller to add neighbour
  await CityDao.addNeighbour(City1, City2).catch((err) => {
    console.log(err)
  })

  //  controller to add neighbour
  await CityDao.addNeighbour(City2, City1).catch((err) => {
    console.log(err)
  })
}

// controller to delete city connection
const deleteCityConnection = async (cityConnection) => {
  const City1 = cityConnection.point1
  const City2 = cityConnection.point2
  const CityConnection = await db.cityConnections.findOne({
    'source': City1,
    'destination': City2
  })

  if (_.isNil(CityConnection)) {
    return Promise.reject(ErrorUtil.buildError(400, 'City Connection does not exist'))
  }
  await db.cityConnections.deleteOne({'source': City1, 'destination': City2}).catch((err) => {
    console.log(err)
  })
  await db.cityConnections.deleteOne({'source': City2, 'destination': City1}).catch((err) => {
    console.log(err)
  })

  //  controller to delete neighbour
  await CityDao.deleteNeighbour(City1, City2).catch((err) => {
    console.log(err)
  })

  //  controller to delete neighbour
  await CityDao.deleteNeighbour(City2, City1).catch((err) => {
    console.log(err)
  })
}

const deleteCityConnectionsByCityName = async (cityName) => {
  await db.cityConnections.deleteMany({'source': cityName}).catch((err) => {
    console.log(err)
  })
  await db.cityConnections.deleteMany({'destination': cityName}).catch((err) => {
    console.log(err)
  })
}

const updateCityConnectionCost = async (updatedCityConnection) => {
  const City1 = updatedCityConnection.point1
  const City2 = updatedCityConnection.point2
  const CityConnection1 = await db.cityConnections.findOne({
    'source': City1,
    'destination': City2
  })
  if (_.isNil(CityConnection1)) {
    return Promise.reject(ErrorUtil.buildError(400, 'City Connection does not exist'))
  }
  CityConnection1.cost = updatedCityConnection.cost
  CityConnection1.save()

  const CityConnection2 = await db.cityConnections.findOne({
    'source': City2,
    'destination': City1
  })
  if (_.isNil(CityConnection2)) {
    return Promise.reject(ErrorUtil.buildError(400, 'City Connection does not exist'))
  }
  CityConnection2.cost = updatedCityConnection.cost
  CityConnection2.save()
}

module.exports = {
  addCityConnection,
  deleteCityConnection,
  deleteCityConnectionsByCityName,
  updateCityConnectionCost
}
