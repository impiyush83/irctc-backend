const cityController = require('../controller/cityController')
const uuidv1 = require('uuid/v1')

const getCities = function (req, res) {
  cityController.getCities().then((data) => {
    const cities = data.cities
    return res.status(200).json({
      success: true,
      cities
    })
  })
}

const addCity = function (req, res) {
  const requestBody = req.body
  requestBody['cityId'] = uuidv1()
  cityController.addCity(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const deleteCity = function (req, res) {
  const cityName = req.params.cityName
  cityController.deleteCity(cityName).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const getUnconnectedCity = function (req, res) {
  cityController.getUnconnectedCity().then((data) => {
    const unconnectedCities = data.unconnectedCities
    console.log(unconnectedCities)
    return res.status(200).json({
      success: true,
      unconnectedCities
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const getCityWithMostCrossovers = function (req, res) {
  cityController.getCityWithMostCrossovers().then((data) => {
    const mostCrossoverCities = data.mostCrossoverCities
    console.log(mostCrossoverCities)
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
  getUnconnectedCity,
  deleteCity,
  getCityWithMostCrossovers
}
