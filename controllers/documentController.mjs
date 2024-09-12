import Document from "../models/documentModel.mjs";

    export async function getAll(req,res) {
        try {
            const docs = await Document.find();
            res.status(200).json(docs);
        } catch (e) {
            res.status(500).json({
                errors: {
                    status: 500,
                    type: "get",
                    source: "/",
                    title: "Database error",
                    detail: e.message
                }
            });
        }
    }

    export async function getOne(req,res) {
        const id = req.params.id
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
                errors: {
                    status: 500,
                    type: "get",
                    source: "/:id",
                    title: "Database error",
                    detail: e.message
                }
            });
        }
    }

export async function addOne(req,res) {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        return res.status(400).json({ message: 'Must include title and content' });
    }
    
    try {
        const doc = await Document.create({title, content});
        res.status(201).json(doc);
        
    } catch (e) {
        res.status(500).json({
            errors: {
                status: 500,
                type: "post",
                source: "/",
                title: "Database error",
                detail: e.message
            }
        });
    }

}

export async function updateOne(req,res) {

    const title = req.body.title;
    const content = req.body.content;
    const id = req.params.id;

    if (!title || !content) {
        return res.status(400).json({ message: 'Must include title and content' });
    }

    try {
        const doc = await Document.findOneAndUpdate({_id: id},{title: title, content: content});
        res.status(201).json(doc);

    } catch (e) {
        res.status(500).json({
            errors: {
                status: 500,
                type: "put",
                source: "/:id",
                title: "Database error",
                detail: e.message
            }
        });
    }
}

export async function deleteOne(req,res) {

    const id = req.params.id;

    try {
        const doc = await Document.findOneAndDelete({_id: id});
        res.status(200).json({
            status: 'deleted'});

    } catch (e) {
        res.status(500).json({
            errors: {
                status: 500,
                type: "delete",
                source: "/:id",
                title: "Database error",
                detail: e.message
            }
        });
    }
}
