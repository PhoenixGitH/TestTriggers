'use strict'

const express = require('express')
const api = express.Router()

// Controllers.
const apiCrtl = require('../controllers/API')
const callCrtl = require('../controllers/Call')

// Api of apis.
api.get('/API', apiCrtl.getAPIs)
// Get API info by id.
api.get('/API/:name', apiCrtl.getAPI)
// Access data via post.
api.post('/API', apiCrtl.sendAPI)
// Modify data using API id.
api.put('/API/:APIId', apiCrtl.updateAPI)
api.delete('/API/:APIId', apiCrtl.deleteAPI)

// Call api.
api.post('/Call', callCrtl.getInfo)

module.exports = api
