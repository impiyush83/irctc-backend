const simple = require('simple-mock')
const CityController = require('./../../lib/controller/CityController')
const db = require('./../../lib/dao/models/city')
const CityDao = require('./../../lib/dao/CityDao')
const MongoConnection = require('../../lib/dao/connect')

describe('CityController', function () {

  before(async () => {
    await MongoConnection.init(true)
    await db.cities.deleteMany({})
  })

  after(async () => simple.restore())

  afterEach(async () => db.cities.deleteMany({}))

  describe('addCity()', function () {
    it('add new city', async function () {
      const newCity = {'cityName': 'Bangalore'}
      // add newcity to city model
      await CityController.addCity(newCity)
      // fetch city from model
      const city = await CityDao.getCityByCityName(newCity.cityName)
      // chec
      newCity.cityName.should.be.eql(city.cityName)
    })
  })
})
