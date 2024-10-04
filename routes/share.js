const express = require('express');
const { shareDoc } = require('../controllers/share.js');

const router = express.Router();

router.put('/', shareDoc);

module.exports = router;
