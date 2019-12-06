'use strict'

const routes = require('express').Router()
const CityHandler = require('./../handler/cityHandler')
const Validator = require('./../validator')
const auth = require('../auth')

// this is a sample api
routes.get(`/getCities`, auth.HasRole('admin'), CityHandler.getCities)
// use case apis
routes.post(`/city`, auth.HasRole('admin'), Validator.addCitySchema, CityHandler.addCity)
routes.delete(`/city/:name`, auth.HasRole('admin'), CityHandler.deleteCity)
routes.get(`/independantcities`, auth.HasRole('admin'), CityHandler.getUnconnectedCities)
routes.get(`/globalcities`, auth.HasRole('admin'), CityHandler.getCitiesWithMostCrossovers)

module.exports = routes
