const db = require('../database/models/city')
const ErrorUtil = require('./../util/error')
const _ = require('ramda')
const cityConnectionController = require('./cityConnectionController')
const cityDao = require('../database/cityDao')

// controller to get cities
const getCities = async () => {
  const cities = await db.cities.find({}, {
    _id: 0,
    cityId: 1,
    cityName: 1,
    neighbours: 1
  })
  return {
    cities
  }
}

// controller to add city
const addCity = async (city) => {
  const City = await db.cities.findOne({'cityName': city.cityName})
  if (City) {
    return Promise.reject(ErrorUtil.buildError(409, 'City already exists'))
  }
  await db.cities.create(city).catch((err) => {
    console.log(err)
  })
}

// controller to delete city
const deleteCity = async (cityName) => {
  const City = await cityDao.getCityByCityName(cityName)
  if (_.isNil(City)) {
    return Promise.reject(ErrorUtil.buildError(400, 'City does not exist'))
  }
  const neighbours = City.neighbours

  if (neighbours !== undefined) {
    neighbours.forEach(async (neighbour) => {
      await cityDao.deleteNeighbour(cityName, neighbour)
    })
  }
  await cityDao.deleteCityByCityName(cityName)
  await cityConnectionController.deleteCityConnectionsByCityName(cityName)
}

// controller to find unconnected city
const getUnconnectedCity = async () => {
  const unconnectedCities = await db.cities.find(
    {'neighbours': {$exists: true, $eq: []}}, {'cityName': 1, '_id': 0}).catch((err) => {
    console.log(err)
  })
  return {
    unconnectedCities
  }
}

const getCityWithMostCrossovers = async () => {
  const mostCrossoverCityAggregation = await db.cities.aggregate([
    {$group: {_id: null, count: {$max: {$size: '$neighbours'}}}}]).catch((err) => {
    console.log(err)
  })

  const maxNeighboursCount = mostCrossoverCityAggregation[0].count
  if (maxNeighboursCount === 0) {
    const mostCrossoverCities = {
      'message': 'All cities are unconnected ! There is no such city with maximum crossovers'
    }
    return {
      mostCrossoverCities
    }
  }
  const mostCrossoverCities = await db.cities.find(
    {neighbours: {$size: maxNeighboursCount}}, {cityName: 1, _id: 0})
  return {
    mostCrossoverCities
  }
}

module.exports = {
  getCities,
  addCity,
  getUnconnectedCity,
  deleteCity,
  getCityWithMostCrossovers
}
