'use strict'

const joi = require('express-joi').Joi
const expressJoi = require('express-joi')

const addCitySchema = {
  cityName: joi.types.String().required()
}

const addCityConnectionSchema = {
  point1: joi.types.String().required(),
  point2: joi.types.String().required(),
  cost: joi.types.Number().integer().required().min(1)
}

const updateCityConnectionSchema = {
  point1: joi.types.String().required(),
  point2: joi.types.String().required(),
  cost: joi.types.Number().integer().required().min(1)
}

module.exports = {
  addCitySchema: expressJoi.joiValidate(addCitySchema),
  addCityConnectionSchema: expressJoi.joiValidate(addCityConnectionSchema),
  updateCityConnectionSchema: expressJoi.joiValidate(updateCityConnectionSchema)
}
