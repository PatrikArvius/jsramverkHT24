const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    commentator: { type: String },
    text: { type: String },
    comment: { type: String },
});

const documentSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        creator: { type: String },
        docAccess: [{ type: String }],
        docComments: [{ type: commentSchema, default: [] }],
    },
    { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
