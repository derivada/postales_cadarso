const Pool = require("pg").Pool

const db = new Pool({
    user: "tests",
    password: "admin",
    database: "tests",
    host: "localhost",
    port: 5432
})

module.exports = db