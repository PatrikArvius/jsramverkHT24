const express = require('express');
const { loginUser } = require('../controllers/login.js');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;
