const express = require("express");
let router = express.Router();

const { getPostal } = require("../controllers/postalController");

router.route("/:key").get(getPostal);

module.exports = router; // Objeto router usado en app.js para redirigir las rutas aquí
