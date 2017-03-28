'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CallModel = Schema({
  params: { type: Array, items: { type: 'object', properties: { name: String, value: String }, required: true } },
  url: { type: String, required: true },
  parametro: String,
  auth: { type: 'object', properties: { name: String, value: String } }
})

module.exports = mongoose.model('Call', CallModel)
