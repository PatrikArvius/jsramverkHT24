const express = require('express');
const {
    addOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require('../controllers/documentController.js');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', addOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;
