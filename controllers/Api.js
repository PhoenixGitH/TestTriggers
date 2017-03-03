'use strict'

// Data base models
const API = require('../models/api')

function getAPIs (req, res) {
  API.find({}, (err, APIs) => {
    if (err) {
      res.status(500).send({ message: 'Error al recuperar los APIs' })
    }
    if (!APIs) {
      res.status(404).send({ message: 'No existe APIs' })
    }
    console.log(`APIs recuperados: ${APIs}`)
    // Just specify API as the key and the value has the same name.
    res.status(200).send({APIs})
  })
}

function getAPI (req, res) {
  console.log('GET /api/API/name')

  // Store the params in variables.
  let name = req.params.name

  API.find({'name': `${name}`}, (err, api) => {
  // API.findById(name, (err, api) => {
    if (err) {
      res.status(500).send({ message: 'Error al recuperar el objeto indicado' })
    }
    if (!api) {
      res.status(404).send({ message: 'No existe un API con ese id' })
    }
    console.log(`API recuperado: ${api}`)
    // Just specify API as the key and the value has the same name.
    res.status(200).send(api[0])

    // get walking directions from central park to the empire state building.

    /* testing connectivity.
    var obj = JSON.stringify({ 'url': `${api[0].protocol}${api[0].url}`,
                'parametro': `${api[0].values[0].ruta}`,
                'params': [ { 'value': 35, 'name': `${api[0].params[0].nombre}` }, { 'name': `${api[0].params[1].nombre}`, 'value': 139 } ]
              })

    console.log(obj)

    var http = require('http')
    // get is a simple wrapper for request()
    // which sets the http method to GET

    // An object of options to indicate where to post to
    var post_options = {
       host: 'localhost',
       port: '3000',
       path: '/api/Call',
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Content-Length': Buffer.byteLength(obj)
       }
   }

    // Set up the request
    var post_req = http.request(post_options, function (response) {
      response.setEncoding('utf8')
      var buffer = ''
      response.on('data', function (chunk) {
        console.log('Response: ' + chunk)
        buffer += chunk
      })
      response.on('end', function (err) {
        if (err) res.status(500).send({err})
        // finished transferring data
        // dump the raw data
        // route = res.routes[0]

        if (buffer) {
          res.status(200).send(JSON.parse(buffer))
        } else {
          res.status(404).send({ message: 'Error, no localizado' })
        }
      })
    })

    // post the data
    post_req.write(obj)
    post_req.end() */
  })
}

function sendAPI (req, res) {
  /* Testing post.
  console.log(req.body)
  res.status(200).send({message: 'El API se ha recibido'}) */
  console.log('POST /api/API')
  console.log(req.body)

  let api = new API()
  api.name = req.body.name
  api.description = req.body.description
  api.url = req.body.url
  api.protocol = req.body.protocol
  api.params = req.body.params
  api.values = req.body.values

  api.save((err, APIStored) => {
    if (err) {
      res.status(500).send({message: `Error al salvar API en la base de datos: ${err}`})
    }
    res.status(200).send({API: APIStored})
  })
}

function updateAPI (req, res) {
  console.log('PUT /api/API/APIId')

  let APIId = req.params.APIId
  /* Not do the things like this.
    API.findById(APIId, (err,API) => {
    if(err) return res.status(500).send( { message: 'Error al recuperar el objeto indicado' })
    API.name = req.body.name
    API.picture = req.body.picture
    API.price = req.body. price
    API.category = req.body.category
    API.description = req.body.description
    API.save((err,APIStored) => {
      if(err) return res.status(500).send({ message: `Error al salvar API con id: ${APIId} en la base: ${err}` })
      res.status(200).send({ message: 'Se ha guardado el API correctamente. '})
    })
  }) */
  // This is the correct one.
  // The object that contains de data is de request body.
  API.findByIdAndUpdate(APIId, req.body, (err, APIUpdate) => {
    if (err) {
      res.status(500).send({ message: `Error al actualizar API con id: ${APIId} en la base: ${err}` })
    }
    if (!APIUpdate) {
      res.status(404).send({ message: 'No existe un API con ese id' })
    }
    res.status(200).send({message: `Se ha guardado el API correctamente: ${APIUpdate}`})
  })
}

function deleteAPI (req, res) {
  let APIId = req.params.APIId
  API.findById(APIId, (err, api) => {
    if (err) {
      res.status(500).send({ message: `Error al borrar el API : ${err}` })
    }
    if (!api) {
      res.status(404).send({ message: 'No existe API con ese id' })
    }
    API.remove(err => {
      if (err) {
        res.status(500).send({ message: `Error al borrar el API : ${err}` })
      }
      res.status(200).send({ message: `API con id: ${APIId} eliminado.` })
    })
  })
}

module.exports = {
  getAPI,
  getAPIs,
  updateAPI,
  sendAPI,
  deleteAPI
}
