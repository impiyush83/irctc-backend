const CityDao = require('../database/cityDao')
const CityConnectionDao = require('../database/cityConnectionDao')
const _ = require('ramda')

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
  const ignoreCities = [source, destination]
  let sourceNeighbours = await CityDao.getNeighbours(source)
  let destinationNeighbours = await CityDao.getNeighbours(destination)
  sourceNeighbours = sourceNeighbours.filter((item) => !ignoreCities.includes(item))
  destinationNeighbours = destinationNeighbours.filter((item) => !ignoreCities.includes(item))
  console.log(ignoreCities, sourceNeighbours, destinationNeighbours)
  const oneStopNodes = sourceNeighbours.filter((item) => destinationNeighbours.includes(item))
  if (_.isEmpty(oneStopNodes)) {
    return {}
  }
  let paths = []
  for (let index = 0; index < oneStopNodes.length; index++) {
    const sourceToStopCost = await CityConnectionDao.getEdgeCost(source, oneStopNodes[index])
    const stoptoDestinationCost = await CityConnectionDao.getEdgeCost(oneStopNodes[index], destination)
    const path = {
      path: source + '-' + oneStopNodes[index] + '-' + destination,
      cost: sourceToStopCost + stoptoDestinationCost
    }
    paths.push(path)
  }
  paths.sort(function (a, b) {
    return a.cost - b.cost
  })
  return paths
}

const getTwoStopConnections = async (source, destination) => {

}

module.exports = {
  getDirectConnection,
  getOneStopConnections,
  getTwoStopConnections
}
