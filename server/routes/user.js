const express = require('express')
let router = express.Router()

const db = require('./../db/conn')

router.route('/list').get(async (req, res) => {
  // Sacar el ID, nombre y status de la BBDD
  const users = await db.find(
    {},
    { _id: 1, name: 1, opened: 1 })
    .exec();
  res.json(users)
})

router.route('/register').post(async (req, res) => {

  // 1. Validar request y correo (TODO)
  let {correo, usuario} = req.body

  // 2. Guardar en la base de datos
  const query_result = await db.updateOne({ _id: usuario }, {email: correo})
  console.log(`Registrado el correo de ${query_result.modifiedCount} usuario`)
  // 3. Notificar al usuario (responder al POST)
  res.json({success: true})

  // 4. Preparar y enviar correo (TODO)

})


module.exports = router // Objeto router usado en app.js para redirigir las rutas aquí
