"use strict"

const express = require('express')
let router = express.Router()

router.route('/').post(addEmail)

router.route('/send/').post(sendEmail)


function sendEmail(req, res) {
    console.log('Sending email')

}

function addEmail(req, res) {
    console.log('Adding email to the DB!')
    res.setHeader('Content-Type', 'application/json')
    
    console.log(`Email ${req.body.email} añadido a la base de datos\n`)
    let response = {'success': 1}
    res.json(response)
}

module.exports = router // This is the router object that is used on the require() at app.js