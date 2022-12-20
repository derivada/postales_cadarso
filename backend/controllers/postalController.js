const User = require('../models/userModel')

const getPostal = async (req, res) => {
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
        dedicatoria: user.dedicatoria,
        cuerpo: user.cuerpo,
        posdata: user.posdata,
        imagen: user.imagen
    });

    // 3. Marcar como postal abierta
    user.opened = true;
    user.opened_timestamp = new Date();
    await user.save();
};

module.exports = { getPostal }; 
