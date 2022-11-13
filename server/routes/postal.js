const express = require('express')
let router = express.Router()

const {User} = require('../db/conn')

router.route('/:key').get(async (req, res) => {
    // Sacar el ID, nombre y status de la BBDD
    console.log(`Obteniendo postal con key= {req.params.key}`)
})


module.exports = router // Objeto router usado en app.js para redirigir las rutas aquí
