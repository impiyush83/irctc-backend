const PathDao = require('../database/pathDao')

const getPaths = async (source, destination) => {
  const directConnection = await PathDao.getDirectConnection(source, destination)
  console.log(directConnection)
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
