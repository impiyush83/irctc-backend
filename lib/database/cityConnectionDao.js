const dbCityConnection = require('./models/cityConnections')

const getEdgeCost = async (source, destination) => {
  const edgeCost = await dbCityConnection.cityConnections.findOne(
    {'source': source, 'destination': destination}, {'cost': 1, '_id': 0}
  )
  return edgeCost.cost
}

module.exports = {
  getEdgeCost
}
