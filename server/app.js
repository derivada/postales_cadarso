const http = require('http');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'})

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3001;

const app = express()

// Express and enable CORS
app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:3000" // TODO: change to ENV, this should be the client URL
}))

// Parse body of requests to JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
const users = require('./routes/user')
app.use('/user', users)

// Connect to DB
const db_access = require('./db/conn')


// Setup server
app.listen(port, () => {
    console.log(`Test app listening on port ${port}`)
})

