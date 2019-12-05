'use strict'

const routes = require('express').Router()
const CityConnectionHandler = require('./../handler/cityConnectionHandler')
const Validator = require('./../validator')

routes.post(`/cityconnection`, Validator.addCityConnectionSchema, CityConnectionHandler.addCityConnection)
routes.delete(`/cityconnection`, CityConnectionHandler.deleteCityConnection)
routes.put(`/cityconnection`, Validator.updateCityConnectionSchema, CityConnectionHandler.updateCityConnectionCost)

module.exports = routes
