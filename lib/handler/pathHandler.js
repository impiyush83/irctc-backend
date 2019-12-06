const pathController = require('../controller/pathController')
const CityDao = require('../dao/cityDao')
const ErrorUtil = require('./../util/error')
const _ = require('ramda')

const isPathsQueryValid = function (source, destination) {
  if (source === destination) {
    return true
  }
  return false
}

const getPaths = async (req, res) => {
  const source = req.query.source
  const destination = req.query.destination

  if (source === undefined || destination === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Source and destination query params not provided'
    })
  }

  if (isPathsQueryValid(source, destination)) {
    return res.status(400).json({
      success: false,
      message: 'Source and destination cannot be same'
    })
  }

  const city1 = await CityDao.getCityByCityName(source)

  if (_.isNil(city1)) {
    return Promise.reject(ErrorUtil.buildError(400, 'source does not exists'))
  }

  // check if city2 exists
  const city2 = await CityDao.getCityByCityName(destination)

  if (_.isNil(city2)) {
    return Promise.reject(ErrorUtil.buildError(400, 'destination does not exists'))
  }

  pathController.getPaths(source, destination).then((data) => {
    const paths = {
      'directConnection': data.directConnection,
      'oneStopConnections': data.oneStopConnections,
      'twoStopConnections': data.twoStopConnections
    }
    return res.status(200).json({
      success: true,
      paths
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

module.exports = {
  getPaths
}
