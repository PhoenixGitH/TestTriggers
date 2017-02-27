'use strict'

const express = require('express')
const api = express.Router()

// Controllers.
const proCrtl = require('../controllers/API')

api.get('/API', proCrtl.getAPIs)
// Get API info by id.
api.get('/API/:APIId', proCrtl.getAPI)
// Access data via post.
api.post('/API', proCrtl.sendAPI)
// Modify data using API id.
api.put('/API/:APIId', proCrtl.updateAPI)
api.delete('/API/:APIId', proCrtl.deleteAPI)

module.exports = api
