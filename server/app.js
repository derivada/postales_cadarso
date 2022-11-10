const http = require('http');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
require('dotenv').config({path: __dirname + '/.env'})

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;

const db = require("./db")

app.use(express.json())
app.use(cors())

// Parse body of requests to JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
const emails = require('./routes/emails')
app.use('/emails', emails)


// get a user
app.get("/", async(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');}
    )

// create a user
app.post("/tests", async(req, res) => {
    try {
        const values = []
        values.push(req.body.name)
        const newUser = await db.query('INSERT INTO test_data (name) VALUES($1) RETURNING *', values)
    } catch(error) {
        console.log(error)
    }
})

// update a user

// delete a user



app.listen(port, () => {
    console.log(`Test app listening on port ${port}`)
})

