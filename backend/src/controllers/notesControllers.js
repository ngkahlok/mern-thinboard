import Note from '../models/Note.js';

const getAllNotes = async (_, res) => { // no need for req if not used, use _ as a convention
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); //newest first
        res.status(200).json({ status: 200, data: notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error?.message });
    }
};

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json({ status: 201, message: 'Note created successfully', data: savedNote });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error?.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ status: 404, message: 'Note not found' });
        }
        res.status(200).json({ status: 200, message: 'Note updated successfully', data: updatedNote });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error?.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ status: 404, message: 'Note not found' });
        }
        res.status(200).json({ status: 200, message: 'Note deleted successfully', data: deletedNote });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error?.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ status: 404, message: 'Note not found' });
        }
        res.status(200).json({ status: 200, data: note });
    } catch (error) {
        console.error('Error fetching note by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error?.message });
    }
}

export {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById
};