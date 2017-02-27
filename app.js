'use strict'

const express = require('express')
const bodyparser = require('body-parser')

// Generate the app via express.
const app = express()
const api = require('./routes') // This will use index.js as default.

// Add body_parser to use json and urlencoded.
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use('/api', api)

module.exports = app
