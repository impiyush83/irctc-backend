const PathDao = require('../dao/pathDao')

const getPaths = async (source, destination) => {
  const directConnection = await PathDao.getDirectConnection(source, destination)
  const oneStopConnections = await PathDao.getOneStopConnections(source, destination)
  const twoStopConnections = await PathDao.getTwoStopConnections(source, destination)
  return {
    directConnection,
    oneStopConnections,
    twoStopConnections
  }
}

module.exports = {
  getPaths
}
