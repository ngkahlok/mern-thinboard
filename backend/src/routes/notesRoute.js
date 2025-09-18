
import express from 'express';
import {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById
} from '../controllers/notesControllers.js';

const router = express.Router();

// Endpoints -> combination of a URL and a HTTP method (GET, POST, PUT, DELETE) that allow 
// client (frontend) to interact with server (backend)
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;