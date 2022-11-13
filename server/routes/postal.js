const express = require("express");
let router = express.Router();

const { User } = require("../db/conn");

router.route("/:key").get(async (req, res) => {
  // 1. Encontrar la postal con la key
  const key = req.params.key;
  const user = await User.findOne({ key: key }).exec();

  // Si no existe, devolver success: false
  if (user === null) {
    res.json({ success: false });
    return;
  }

  // 2. Devolver el texto de la postal (TODO: html e imágenes)
  res.json({
    success: true,
    postal_body: user.postal_body,
  });

  // 3. Marcar como postal abierta
  user.opened = true;
  user.opened_timestamp = new Date();
  await user.save();
});

module.exports = router; // Objeto router usado en app.js para redirigir las rutas aquí
