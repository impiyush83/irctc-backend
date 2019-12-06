'use strict'

const routes = require('express').Router()
const CityHandler = require('./../handler/cityHandler')
const Validator = require('./../validator')
const auth = require('../auth')

routes.get(`/getCities`, auth.HasRole('admin'), CityHandler.getCities)
routes.post(`/city`, auth.HasRole('admin'), Validator.addCitySchema, CityHandler.addCity)
routes.delete(`/city/:cityName`, auth.HasRole('admin'), CityHandler.deleteCity)
routes.get(`/independantcities`, auth.HasRole('admin'), CityHandler.getUnconnectedCity)
routes.get(`/globalcities`, auth.HasRole('admin'), CityHandler.getCityWithMostCrossovers)

module.exports = routes
