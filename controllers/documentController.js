const Document = require('../models/documentModel.js');
const mongoose = require('mongoose');

async function getAll(req, res) {
    const creator = req.user.email;
    const accessToIds = req.user.accessToIds;

    try {
        if (process.env.NODE_ENV == 'test') {
            const docs = await Document.find();
            res.status(200).json(docs);
        } else {
            const docs = await Document.find({
                $or: [{ creator: creator }, { _id: { $in: accessToIds } }],
            });
            res.status(200).json(docs);
        }
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'get',
                source: '/',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

async function getOne(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ message: 'No document found with the provided ID' });
    }

    try {
        const doc = await Document.findById(id);

        if (!doc) {
            return res
                .status(404)
                .json({ message: 'No document found with the provided ID' });
        }

        res.status(200).json(doc);
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'get',
                source: '/:id',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

async function addOne(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const creator = req.body.creator;

    if (!title || !content) {
        return res
            .status(400)
            .json({ message: 'Please fill in all the fields' });
    }

    try {
        const doc = await Document.create({ title, content, creator });
        res.status(201).json(doc);
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'post',
                source: '/',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

async function updateOne(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ message: 'No document found with the provided ID' });
    }

    if (!title || !content) {
        return res
            .status(400)
            .json({ message: 'Please fill in all the fields' });
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
                .json({ message: 'No document found with the provided ID' });
        }

        res.status(200).json(doc);
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'put',
                source: '/:id',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

async function deleteOne(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ message: 'No document found with the provided ID' });
    }

    try {
        const doc = await Document.findOneAndDelete({ _id: id });

        if (!doc) {
            return res
                .status(404)
                .json({ message: 'No document found with the provided ID' });
        }

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'delete',
                source: '/:id',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
};
