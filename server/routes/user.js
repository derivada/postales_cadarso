"use strict"

const express = require('express')
let router = express.Router()

const db = require('./../db/conn')

router.route('/list').get(async (req, res) => {
   // Get the user list from DB
   const user_test = await db.create({
      name: 'Pablo Diaz',
      email: 'tntpablococ@gmail.com',
      link: 'test',
      opened: false,
      opened_timestamp: null
    });
   const users = await db.find().exec();
    console.log(users)
  })

router.route('/register').post(async (req, res) => {
  // Set the email of the user in DB

})



async function registerUserEmail(email){
    // Check if email is correct
    
}

module.exports = router // Objeto router usado en app.js para redirigir las rutas aquí
