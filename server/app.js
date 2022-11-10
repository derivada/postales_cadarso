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
app.use(cors())

// Parse body of requests to JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
const users = require('./routes/user')
app.use('/user', users)

// Connect to DB
const db_access = require('./db/conn')


users.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.path)
    }
})

// Setup server
app.listen(port, () => {
    console.log(`Test app listening on port ${port}`)
})

