const express = require('express');
const {
    shareDoc,
    unshareDoc,
    deleteComment,
} = require('../controllers/share.js');

const router = express.Router();

router.put('/deletecomment', deleteComment);
router.put('/unshare', unshareDoc);
router.put('/', shareDoc);

module.exports = router;
