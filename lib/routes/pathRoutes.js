'use strict'

const routes = require('express').Router()
const PathHandler = require('./../handler/pathHandler')
const auth = require('../auth')

routes.get(`/paths`, auth.HasRole('user'), PathHandler.getPaths)

module.exports = routes
