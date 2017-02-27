'use strict'

// Data base models
const Call = require('../models/call')

function getInfo (req, res) {
  let call = new Call()
  call.params = req.body.params
  call.url = req.body.url
  call.parametro = req.body.parametro
}

module.exports = getInfo
