import express from 'express';
import documents from '../docs.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        return res.status(400).json({ msg: 'must include title and content' });
    }

    const result = await documents.addOne(req.body);
    res.status(201).json(result);
});

router.get('/:id', async (req, res) => {
    const doc = await documents.getOne(req.params.id);
    res.status(200).json(doc);
});

router.get('/', async (req, res) => {
    const docs = await documents.getAll();
    res.status(200).json(docs);
});

router.put('/:id', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        return res.status(400).json({ msg: 'must include title and content' });
    }

    const updatedDoc = await documents.updateOne(req.params.id, req.body);
    res.status(201).json(updatedDoc);
});

export default router;
