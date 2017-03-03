'use strict'

// Data base models
const Call = require('../models/call')

function getInfo (req, res) {
  let call = new Call()
  call.params = req.body.params
  call.url = req.body.url
  console.log(req.body.url + '\n')
  call.parametro = req.body.parametro

  var url = call.url
  var i
  for (i = 0; i < call.params.length; i++) {
    url += call.params[i].name + '=' + call.params[i].value + '&'
  }
  url += 'appid=6faefe9c835124150d6f782947a4c722&'
  url = url.substring(0, url.length - 1)

  console.log('call: ' + url)

  // get walking directions from central park to the empire state building
  var http = require('http')
  // get is a simple wrapper for request()
  // which sets the http method to GET
  http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event
    var buffer = ''
    // var data
    // var route

    response.on('data', function (chunk) {
      buffer += chunk
    })

    response.on('end', function (err) {
      if (err) res.status(500).send({err})
      // finished transferring data
      // dump the raw data
      console.log(buffer)
      console.log('\n')
      var data = JSON.parse(buffer)
      // route = res.routes[0]

      if (call.parametro.startsWith('data')) {
        console.log('Extraido: ' + eval(call.parametro))
        let param = eval(call.parametro)
        if (param != null) {
          res.status(200).send({param})
        } else {
          res.status(404).send({ message: 'Error, parametro no localizado' })
        }
      } else {
        res.status(500).send({ message: 'Error, ruta mal especificada' })
      }

      // extract the distance and time
      // console.log('Walking Distance: ' + route.legs[0].distance.text)
      // console.log('Time: ' + route.legs[0].duration.text)
    })
  })
}

module.exports = {
  getInfo
}
