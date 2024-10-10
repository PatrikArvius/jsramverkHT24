const express = require('express');
const { shareDoc, unshareDoc } = require('../controllers/share.js');

const router = express.Router();

router.put('/unshare', unshareDoc);
router.put('/', shareDoc);

module.exports = router;
