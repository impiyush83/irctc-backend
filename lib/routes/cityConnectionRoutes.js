'use strict'

const routes = require('express').Router()
const CityConnectionHandler = require('./../handler/cityConnectionHandler')
const Validator = require('./../validator')
const auth = require('../auth')

routes.post(`/cityconnection`, auth.HasRole('admin'), Validator.addCityConnectionSchema, CityConnectionHandler.addCityConnection)
routes.delete(`/cityconnection`, auth.HasRole('admin'), CityConnectionHandler.deleteCityConnection)
routes.put(`/cityconnection`, auth.HasRole('admin'), Validator.updateCityConnectionSchema, CityConnectionHandler.updateCityConnectionCost)

module.exports = routes
