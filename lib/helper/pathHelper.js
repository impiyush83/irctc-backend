const CityDao = require('../dao/cityDao')
const CityConnectionDao = require('../dao/cityConnectionDao')

const sortObjectsWithCost = async (paths) => {
  paths.sort(function (a, b) {
    return a.cost - b.cost
  })
  return paths
}

const getOneStopNodes = async (source, destination) => {
  const ignoreCities = [source, destination]
  let sourceNeighbours = await CityDao.getNeighbours(source)
  let destinationNeighbours = await CityDao.getNeighbours(destination)
  sourceNeighbours = sourceNeighbours.filter((item) => !ignoreCities.includes(item))
  destinationNeighbours = destinationNeighbours.filter((item) => !ignoreCities.includes(item))
  const oneStopNodes = sourceNeighbours.filter((item) => destinationNeighbours.includes(item))
  return oneStopNodes
}

const getPathsForOneStopConnections = async (oneStopNodes, source, destination) => {
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
  return paths
}

const getMidPathsForTwoStopConnections = async (sourceNeighbours, destinationNeighbours) => {
  let midPaths = []
  for (let sourceIndex = 0; sourceIndex < sourceNeighbours.length; sourceIndex++) {
    for (let destinationIndex = 0; destinationIndex < destinationNeighbours.length; destinationIndex++) {
      const source = sourceNeighbours[sourceIndex]
      const destination = destinationNeighbours[destinationIndex]
      if (source !== destination) {
        const doesEdgeExists = await CityConnectionDao.doesEdgeExists(source, destination)
        if (doesEdgeExists) {
          const midConnectionCost = await CityConnectionDao.getEdgeCost(source, destination)
          const midPath = {
            path: source + '-' + destination,
            cost: midConnectionCost
          }
          midPaths.push(midPath)
        }
      }
    }
  }
  return midPaths
}

const getAllPathsForTwoStopConnections = async (midPaths, source, destination) => {
  let allPaths = []
  for (let index = 0; index < midPaths.length; index++) {
    const midPathCost = midPaths[index].cost
    const midPath = midPaths[index].path.split('-')
    const midPathStart = midPath[0]
    const midPathEnd = midPath[1]
    const doesStartEdgeExists = await CityConnectionDao.doesEdgeExists(source, midPathStart)
    const doesEndEdgeExists = await CityConnectionDao.doesEdgeExists(midPathEnd, destination)
    if (doesStartEdgeExists && doesEndEdgeExists) {
      const startConnectionCost = await CityConnectionDao.getEdgeCost(source, midPathStart)
      const endConnectionCost = await CityConnectionDao.getEdgeCost(midPathEnd, destination)
      const path = {
        path: source + '-' + midPathStart + '-' + midPathEnd + '-' + destination,
        cost: startConnectionCost + midPathCost + endConnectionCost
      }
      allPaths.push(path)
    }
  }
  return allPaths
}

module.exports = {
  sortObjectsWithCost,
  getOneStopNodes,
  getPathsForOneStopConnections,
  getMidPathsForTwoStopConnections,
  getAllPathsForTwoStopConnections
}
