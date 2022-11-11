const express = require('express')
let router = express.Router()

const db = require('./../db/conn')

router.route('/list').get(async (req, res) => {
  // Get the user list from DB
  const users = await db.find(
    {},
    { _id: 1, name: 1, opened: 1 })
    .exec();
  res.json(users)
})

router.route('/register').post(async (req, res) => {
  // Set the email of the user in DB

})



async function registerUserEmail(email) {
  // Check if email is correct

}

module.exports = router // Objeto router usado en app.js para redirigir las rutas aquí
