const dbCity = require('./models/city')

// controller to add neighbour
const addNeighbour = async (cityName, neighbourName) => {
  await dbCity.cities.updateOne({'cityName': cityName}, {'$addToSet': {'neighbours': neighbourName}})
}

// controller to delete neighbour
const deleteNeighbour = async (cityName, neighbourName) => {
  await dbCity.cities.updateOne({'cityName': neighbourName}, {'$pull': {'neighbours': cityName}})
}

// controller to get city from cityName
const getCityByCityName = async (cityName) => {
  const city = await dbCity.cities.findOne({'cityName': cityName}, {'cityName': 1, 'neighbours': 1, '_id': 0})
  return city
}

const deleteCityByCityName = async (cityName) => {
  await dbCity.cities.deleteOne({'cityName': cityName})
}

const getNeighbours = async (city) => {
  const neighbours = await dbCity.cities.find({'cityName': city}, {'neighbours': 1, '_id': 0})
  return neighbours[0].neighbours
}

module.exports = {
  addNeighbour,
  deleteNeighbour,
  getCityByCityName,
  deleteCityByCityName,
  getNeighbours
}
