'use strict'

const _ = require('lodash')

const cities = [
  {
    'cityId': '1',
    'cityName': 'Pune',
    'neighbours': [
      'Bengaluru',
      'Mumbai',
      'Delhi'
    ]
  },
  {
    'cityId': '2',
    'cityName': 'Bengaluru',
    'neighbours': [
      'Pune'
    ]
  },
  {
    'cityId': '3',
    'cityName': 'Mumbai',
    'neighbours': [
      'Pune',
      'Thane'
    ]
  },
  {
    'cityId': '4',
    'cityName': 'Delhi',
    'neighbours': [
      'Pune'
    ]
  },
  {
    'cityId': '5',
    'cityName': 'Thane',
    'neighbours': [
      'Goa',
      'Mumbai',
      'Kashmir'
    ]
  },
  {
    'cityId': '6',
    'cityName': 'Guwahati'
  },
  {
    'cityId': '7',
    'cityName': 'Goa',
    'neighbours': [
      'Thane'
    ]
  },
  {
    'cityId': '8',
    'cityName': 'Kashmir',
    'neighbours': [
      'Solapur',
      'Thane'
    ]
  },
  {
    'cityId': '9',
    'cityName': 'Solapur',
    'neighbours': [
      'Kashmir'
    ]
  }
]

module.exports = {
  getCities: () => _.cloneDeep(cities)
}
