'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cityConnectionSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  cityConnections: mongoose.model('cityConnections', cityConnectionSchema)
}
