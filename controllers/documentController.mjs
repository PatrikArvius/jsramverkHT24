import Document from '../models/documentModel.mjs';
import mongoose from 'mongoose';

export async function getAll(req, res) {
    try {
        const docs = await Document.find();
        res.status(200).json(docs);
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'get',
            source: '/',
            title: 'Database error',
            detail: e.message,
        });
    }
}

export async function getOne(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No doc found with that ID' });
    }

    try {
        const doc = await Document.findById(id);

        if (!doc) {
            return res
                .status(404)
                .json({ message: 'No doc found with that ID' });
        }

        res.status(200).json(doc);
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'get',
            source: '/:id',
            title: 'Database error',
            detail: e.message,
        });
    }
}

export async function addOne(req, res) {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        return res
            .status(400)
            .json({ message: 'Must include title and content' });
    }

    try {
        const doc = await Document.create({ title, content });
        res.status(201).json(doc);
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'post',
            source: '/',
            title: 'Database error',
            detail: e.message,
        });
    }
}

export async function updateOne(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No doc found with that ID' });
    }

    if (!title || !content) {
        return res
            .status(400)
            .json({ message: 'Must include title and content' });
    }

    try {
        const doc = await Document.findOneAndUpdate(
            { _id: id },
            { title: title, content: content },
            { new: true, runValidators: true }
        );

        if (!doc) {
            return res
                .status(404)
                .json({ message: 'No doc found with that ID' });
        }

        res.status(200).json(doc);
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'put',
            source: '/:id',
            title: 'Database error',
            detail: e.message,
        });
    }
}

export async function deleteOne(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No doc found with that ID' });
    }

    try {
        const doc = await Document.findOneAndDelete({ _id: id });

        if (!doc) {
            return res
                .status(404)
                .json({ message: 'No doc found with that ID' });
        }

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'delete',
            source: '/:id',
            title: 'Database error',
            detail: e.message,
        });
    }
}
