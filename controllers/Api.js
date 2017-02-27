'use strict'

// Data base models
const API = require('../models/Api')

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
  console.log('GET /api/API/APIId')

  // Store the params in variables.
  let APIId = req.params.APIId

  API.findById(APIId, (err, API) => {
    if (err) {
      res.status(500).send({ message: 'Error al recuperar el objeto indicado' })
    }
    if (!API) {
      res.status(404).send({ message: 'No existe un API con ese id' })
    }
    console.log(`API recuperado: ${API}`)
    // Just specify API as the key and the value has the same name.
    res.status(200).send({API})
  })
}

function sendAPI (req, res) {
  /* Testing post.
  console.log(req.body)
  res.status(200).send({message: 'El API se ha recibido'}) */
  console.log('POST /api/API')
  console.log(req.body)

  let API = new API()
  API.name = req.body.name
  API.description = req.body.description
  API.url = req.body.url
  API.params = req.body.params

  API.save((err, APIStored) => {
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
  API.findById(APIId, (err, API) => {
    if (err) {
      res.status(500).send({ message: `Error al borrar el API : ${err}` })
    }
    if (!API) {
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
