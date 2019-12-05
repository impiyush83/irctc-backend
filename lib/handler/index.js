'use strict'

const Controller = require('./../controller')

const getPong = function (req, res) {

  const response = Controller.getPong()
  res.status(200).json({ message: response })
}

module.exports = {
  getPong
}
