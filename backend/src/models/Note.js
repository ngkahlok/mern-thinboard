import mongoose from "mongoose";

// 1 - create a schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }) //createdAt, updatedAt field by default


// 2 - model based off the schema
const Note = mongoose.model('Note', noteSchema);

export default Note;