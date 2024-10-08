const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        creator: { type: String },
        docAccess: [{ type: String }],
    },
    { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
