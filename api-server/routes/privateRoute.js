const express = require("express");
const router = express.Router();
const verifyToken = require('../config/jwtAuth');

const { getPrivateData} = require("../controllers/privateController");

router.get("/private", verifyToken, getPrivateData);

module.exports = router;