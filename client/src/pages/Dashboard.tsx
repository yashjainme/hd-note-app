import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Note {
  _id: string;
  content: string;
}

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await api.get('/notes');
                setNotes(data);
            } catch (error) {
                toast.error('Failed to fetch notes.');
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNote.trim()) return;
        try {
            const { data } = await api.post('/notes', { content: newNote });
            setNotes([...notes, data]);
            setNewNote('');
            toast.success('Note created!');
        } catch (error) {
            toast.error('Failed to create note.');
        }
    };

    const handleDeleteNote = async (id: string) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
            toast.success('Note deleted!');
        } catch (error) {
            toast.error('Failed to delete note.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <img src="logo-icon.svg" alt="Logo" className="w-7 h-7" />
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    </div>
                    <button onClick={logout} className="text-sm cursor-pointer font-semibold text-brand-blue hover:underline">
                        Sign Out
                    </button>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold">Welcome, {user?.name}!</h2>
                    <p className="text-sm text-text-secondary">{user?.email}</p>
                </div>
                
                <form onSubmit={handleCreateNote} className="mb-6">
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Your new note..."
                        className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                    />
                    <button type="submit" className="w-full bg-brand-blue cursor-pointer text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition">
                        Create Note
                    </button>
                </form>

                <div>
                    <h3 className="font-semibold mb-3">Notes</h3>
                    <div className="space-y-3">
  {notes.length > 0 ? (
    notes.map(note => (
    <div
  key={note._id}
  className="flex p-3 bg-white shadow rounded-xl"
>
  <div className="flex-1 min-w-0">
    <p className="text-gray-800 break-words">
      {note.content}
    </p>
  </div>
  <button
    onClick={() => handleDeleteNote(note._id)}
    className="ml-4 flex-shrink-0 self-start"
  >
    <img
      src="delete-icon.svg"
      alt="Delete"
      className="w-5 h-5 cursor-pointer"
    />
  </button>
</div>


    ))
  ) : (
    <p className="text-center text-gray-500">
      No notes yet. Create one!
    </p>
  )}
</div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;