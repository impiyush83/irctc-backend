const CityConnectionController = require('../controller/cityConnectionController')

const addCityConnection = function (req, res) {
  const requestBody = req.body
  CityConnectionController.addCityConnection(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    console.log(err)
    return res.status(400).json(err)
  })
}

const deleteCityConnection = function (req, res) {
  const requestBody = req.body
  CityConnectionController.deleteCityConnection(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    console.log(err)
    return res.status(400).json(err)
  })
}

const updateCityConnectionCost = function (req, res) {
  const requestBody = req.body
  CityConnectionController.updateCityConnectionCost(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    console.log(err)
    return res.status(400).json(err)
  })
}

module.exports = {
  addCityConnection,
  deleteCityConnection,
  updateCityConnectionCost
}
