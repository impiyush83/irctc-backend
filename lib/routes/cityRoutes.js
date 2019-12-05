'use strict'

const routes = require('express').Router()
const CityHandler = require('./../handler/cityHandler')
const Validator = require('./../validator')
const auth = require('../auth')

routes.use(auth.HasRole('admin'))
routes.get(`/getCities`, CityHandler.getCities)
routes.post(`/city`, Validator.addCitySchema, CityHandler.addCity)
routes.delete(`/city/:cityName`, CityHandler.deleteCity)
routes.get(`/unconnectedCity`, CityHandler.getUnconnectedCity)
routes.get(`/mostcrossovercity`, CityHandler.getCityWithMostCrossovers)

module.exports = routes
