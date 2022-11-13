const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { v4 } = require("uuid");
const validator = require("email-validator");

let router = express.Router();

const { User } = require("./../db/conn");

// Cliente gmail para enviar los correos
let client = null;
async function loginCorreo() {
  client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  client.setCredentials({
    refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
  });
}

router.route("/list").get(async (req, res) => {
  // Obtener lista de usuarios con su ID, nombre y status
  const users = await User.find({}, { _id: 1, name: 1, opened: 1 }).exec();
  res.json(users);
});

router.route("/register").post(async (req, res) => {
  /*
   * En este método se registra el correo del usuario y se le envía el link con la postal
   *
   * Acepta un JSON {dir: 'test@test.com', user: 123} con la dirección de correo a registrar y el
   * ID del usuario
   *
   * Devuelve un JSON {sucess: true/false, reason: '...'} que incluye el éxito del método
   * y por qué fallo si lo hizo, si no fallo reason es null
   */

  // 1. Validar request y correo
  let { dir, usuario } = req.body;
  let user = null;
  try {
    user = await User.findOne({ $and: [{ _id: usuario }, {opened: false}] }).exec();
    if (user === null) throw new Error();
  } catch (err) {
    console.log("No se pudo encontrar al usuario");
    console.log(err);
    res.json({
      success: false,
      reason: "El usuario no es válido!",
    });
    return;
  }
  if (!validator.validate(dir)) {
    res.json({
      success: false,
      reason: "El correo electrónico no es válido!",
    });
    return;
  }

  // 2. Generar key del link y guardar email y key en la DB
  user.email = dir;
  user.key = v4();
  await user.save();

  // 3 Enviar correo con el link
  let { status, reason } = await enviarCorreo(user.email, user.key);

  // 4. Notificar al usuario (responder al POST)
  res.json({ success: status, reason: reason });
});

async function enviarCorreo(dir, key) {
  // 1. Obtener el link completo de la postal (TODO meter el link de verdad)
  let link = process.env.FRONTEND_URL + '/postal/' + key

  // 2. Obtener el cliente de gmail
  if (client === null) {
    try {
      await loginCorreo();
    } catch (err) {
      console.log("ERROR: No se pudo acceder a la cuenta de correo!");
      console.log(err);
      return { status: false, reason: "El servidor no pudo enviar el correo!" };
    }
  }

  try {
    // 3. Obtener el token y configurar el transporter
    const accessToken = await client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "devderivadas@gmail.com",
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // 4. Especificar el destinatario y el texto/html
    const text = `Holaaaa, aquí está el link a tu postal :) ${link}`;
    const html = `<div>
    <h3>Holaaa, aquí está el link a tu postal</h3>
    <a href="${link}">Abrir postal!</a> 
    Espero que te guste!
    <h5>Feliz navidad!!</h5>
    Pablo
    </div>`;

    // 5. Crear el correo y enviar
    const mailOptions = {
      from: "🥰Postales Cadarso🥰 <devderivadas@gmail.com>",
      to: dir,
      subject: "Link a tu postal :)",
      text: text,
      html: html,
    };
    const result = await transporter.sendMail(mailOptions);
    console.log("Correo enviado!");
    console.log(result);
    return { status: true, reason: null };
  } catch (err) {
    console.log("Error al enviar correo");
    console.log(err);
    return { status: false, reason: "El servidor no pudo enviar el correo!" };
  }
}

module.exports = router; // Objeto router usado en app.js para redirigir las rutas aquí