import mongoose from 'mongoose';
const { Schema } = mongoose;

const documentSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
}, {timestamps: true});

const Document = mongoose.model('Document', documentSchema);

export default Document;
