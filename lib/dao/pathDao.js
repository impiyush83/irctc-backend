const CityDao = require('./cityDao')
const CityConnectionDao = require('./cityConnectionDao')
const _ = require('ramda')
const PathHelper = require('../helper/pathHelper')

const getDirectConnection = async (source, destination) => {
  const neighbours = await CityDao.getNeighbours(source)
  for (let index = 0; index < neighbours.length; index++) {
    if (neighbours[index] === destination) {
      const pathCost = await CityConnectionDao.getEdgeCost(source, destination)
      const path = source + '-' + destination
      return {
        'path': path,
        'cost': pathCost
      }
    }
  }
  return {}
}

const getOneStopConnections = async (source, destination) => {
  let oneStopPaths = []
  const oneStopNodes = await PathHelper.getOneStopNodes(source, destination)
  if (_.isEmpty(oneStopNodes)) {
    return {}
  }
  oneStopPaths = await PathHelper.getPathsForOneStopConnections(oneStopNodes, source, destination)
  oneStopPaths = await PathHelper.sortObjectsWithCost(oneStopPaths)
  return oneStopPaths
}

const getTwoStopConnections = async (source, destination) => {
  let twoStopPaths = []
  let midPaths = []
  const ignoreCities = [source, destination]
  let sourceNeighbours = await CityDao.getNeighbours(source)
  let destinationNeighbours = await CityDao.getNeighbours(destination)
  sourceNeighbours = sourceNeighbours.filter((item) => !ignoreCities.includes(item))
  destinationNeighbours = destinationNeighbours.filter((item) => !ignoreCities.includes(item))
  if (_.isEmpty(sourceNeighbours) || _.isEmpty(destinationNeighbours)) {
    return {}
  }
  midPaths = await PathHelper.getMidPathsForTwoStopConnections(
    sourceNeighbours,
    destinationNeighbours
  )
  twoStopPaths = await PathHelper.getAllPathsForTwoStopConnections(midPaths, source, destination)
  twoStopPaths = await PathHelper.sortObjectsWithCost(twoStopPaths)
  return twoStopPaths
}

module.exports = {
  getDirectConnection,
  getOneStopConnections,
  getTwoStopConnections
}
