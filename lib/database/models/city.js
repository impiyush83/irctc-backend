'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
  cityId: {
    type: String
  },
  cityName: {
    type: String,
    unique: true
  },
  neighbours: [String]
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  cities: mongoose.model('cities', citySchema)
}
