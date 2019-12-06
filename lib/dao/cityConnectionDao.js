const dbCityConnection = require('./models/cityConnections')
const _ = require('ramda')

const getEdgeCost = async (source, destination) => {
  const edgeCost = await dbCityConnection.cityConnections.findOne(
    {'source': source, 'destination': destination}, {'cost': 1, '_id': 0}
  )
  return edgeCost.cost
}

const doesEdgeExists = async (source, destination) => {
  const edge = await dbCityConnection.cityConnections.findOne(
    {'source': source, 'destination': destination}
  )
  if (_.isNil(edge)) {
    return false
  }
  return true
}

module.exports = {
  getEdgeCost,
  doesEdgeExists
}
