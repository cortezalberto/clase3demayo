
const express = require('express');

const router = express.Router();

const controller = require('../controller/homeController');

// Muestra la home page principal (GET)
router.get('/', controller.show);

module.exports = router