const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
