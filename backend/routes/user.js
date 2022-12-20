const express = require('express');
const router = express.Router();

const { getUserList, registerUser, } = require('../controllers/userController')

router.route('/list').get(getUserList)
router.route('/register').post(registerUser)

module.exports = router; // Objeto router usado en app.js para redirigir las rutas aquí