const express = require('express');
const { getAll } = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getAll);

module.exports = router;
