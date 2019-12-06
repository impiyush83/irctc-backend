const CityController = require('../controller/cityController')
const uuidv1 = require('uuid/v1')

const getCities = async (req, res) => {
  CityController.getCities().then((data) => {
    const cities = data.cities
    return res.status(200).json({
      success: true,
      cities
    })
  })
}

const addCity = async (req, res) => {
  const requestBody = req.body
  requestBody['cityId'] = uuidv1()
  CityController.addCity(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const deleteCity = async (req, res) => {
  const cityName = req.params.name
  CityController.deleteCity(cityName).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const getUnconnectedCities = async (req, res) => {
  CityController.getUnconnectedCities().then((data) => {
    const unconnectedCities = data.unconnectedCities
    return res.status(200).json({
      success: true,
      unconnectedCities
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const getCitiesWithMostCrossovers = async (req, res) => {
  CityController.getCitiesWithMostCrossovers().then((data) => {
    const mostCrossoverCities = data.mostCrossoverCities
    return res.status(200).json({
      success: true,
      mostCrossoverCities
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

module.exports = {
  getCities,
  addCity,
  getUnconnectedCities,
  deleteCity,
  getCitiesWithMostCrossovers
}
