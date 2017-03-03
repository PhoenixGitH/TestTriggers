'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const APIModel = Schema({
  params: { type: Array, items: { type: 'object', properties: { tipo: String, nombre: String, descripcion: String }, default: [] } },
  url: { type: String, required: true },
  protocol: { type: String, required: true },
  values: { type: Array, items: { type: 'object', properties: { nombre: String, ruta: String, tipo: String }, required: true } },
  description: String,
  name: String
})

module.exports = mongoose.model('API', APIModel)
