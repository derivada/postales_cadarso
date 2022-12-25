const express = require("express");
let router = express.Router();

const { getPostal } = require("../controllers/postalController");

// api/postal/:key
router.route("/:key").get(getPostal);

module.exports = router;
