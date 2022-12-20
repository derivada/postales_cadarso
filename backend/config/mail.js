const nodemailer = require('nodemailer');

async function enviarCorreo(req, dir, key) {
    // 1. Obtener el link completo de la postal (TODO deployment)
    let link = req.protocol + "://" + req.hostname + '/postal/' + key
    try {
        // 2. Configurar el transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: process.env.GMAIL_ACC,
                pass: process.env.GMAIL_APP_PWD
            }
        })

        // 3. Especificar el destinatario y el texto/html
        const text = `Holaaaa, aquí está el link a tu postal :) ${link}`;
        const html = `<div>
        <h3>Holaaa, aquí está el link a tu postal</h3>
        <a href='${link}'>Abrir postal!</a> 
        Espero que te guste!
        <h5>Feliz navidad!!</h5>
        Pablo
        </div>`;

        // 4. Crear el correo y enviar
        const mailOptions = {
            from: '🥰Postales Cadarso🥰 <devderivadas@gmail.com>',
            to: dir,
            subject: 'Link a tu postal :)',
            text: text,
            html: html,
        };
        const result = await transporter.sendMail(mailOptions);
        console.log('Correo enviado!');
        console.log(result);
        return { status: true, reason: null };
    } catch (err) {
        console.log('Error al enviar correo');
        console.log(err);
        return { status: false, reason: 'El servidor no pudo enviar el correo!' };
    }
}

module.exports = { enviarCorreo }