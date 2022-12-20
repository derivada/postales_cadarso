const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/conn');
require('dotenv').config({ path: __dirname + '/.env' })

const port = process.env.PORT || 3001;

// Initialize server
const app = express()

// Connect to database
connectDB()

// Use express and enable CORS
app.use(express.json())
app.use(cors({
    origin: '*' // TODO: change to ENV, this should be the client URL
}))

// Parse body of requests to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/user', require('./routes/user'))
app.use('/api/postal', require('./routes/postal'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));