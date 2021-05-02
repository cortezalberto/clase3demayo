const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.get('/register', controller.register);

router.get('/login', controller.login);

module.exports = router;