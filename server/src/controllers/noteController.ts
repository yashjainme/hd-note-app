import { Request, Response } from 'express';
import Note from '../models/Note';

// Extend Request type to include user
interface AuthRequest extends Request {
    user?: { id: string };
}

export const getNotes = async (req: AuthRequest, res: Response) => {
    try {
        const notes = await Note.find({ user: req.user!.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createNote = async (req: AuthRequest, res: Response) => {
    const { content } = req.body;
    try {
        const newNote = new Note({
            content,
            user: req.user!.id,
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        if (note.user.toString() !== req.user!.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await note.deleteOne();
        res.status(200).json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};