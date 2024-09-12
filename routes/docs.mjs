import express from 'express';
import {addOne, getAll, getOne, updateOne, deleteOne} from '../controllers/documentController.mjs';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', addOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router;
