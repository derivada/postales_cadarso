const { v4 } = require('uuid');
const validator = require('email-validator');
const User = require('../models/userModel')
const { enviarCorreo } = require('../config/mail')

const getUserList = async (req, res) => {
    // Obtener lista de usuarios con su ID, nombre y status
    const users = await User.find({}, { _id: 1, name: 1, opened: 1 }).exec();
    console.log('Enviando lista de usuarios')
    res.json(users);
};

const registerUser = async (req, res) => {
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
        user = await User.findOne({ $and: [{ _id: usuario }, { opened: false }] }).exec();
        if (user === null) throw new Error();
    } catch (err) {
        console.log('No se pudo encontrar al usuario');
        console.log(err);
        res.json({
            success: false,
            reason: 'El usuario no es válido!',
        });
        return;
    }
    if (!validator.validate(dir)) {
        res.json({
            success: false,
            reason: 'El correo electrónico no es válido!',
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
}

module.exports = { getUserList, registerUser }