'use strict'

const mongoose = require('mongoose')

const app = require('./app')
const config = require('./config')

// Getters
/* Testing route
  app.get('/hola', (req,res) => {
  //Send what ever message you like.
  res.send({ "message": "Hola mundo" })
}) */

// Get API info.
/* app.get('/api/API', (req,res) => {
  // Testing
  //res.status(200).send({APIs: []})

}) */

// Connection to mongoDB data base.
mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar con la base de datos. ${err}`)
  }
  console.log('Conexión con la base de datos establecida')

  // Use enviroment variable port or 3000.
  app.listen(config.port, () => {
    console.log(`API REST corriendo http://localhost:${config.port}`)
  })
})
