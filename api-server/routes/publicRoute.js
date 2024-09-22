const express = require('express');
const router = express.Router();

const { getPublicData} = require("../controllers/publicController");

router.get("/public", getPublicData);

module.exports = router;