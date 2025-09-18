import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
// import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import axiosInstance from '../lib/axios.js'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axiosInstance.get('/notes');
                setNotes(response.data.data);
                setIsRateLimited(false);
                console.log("Fetched notes:", response.data.data);
            } catch (error) {
                console.log("Error fetching notes:", error.response.data);
                if (error.response && error.response.status === 429) {
                    console.log(error);
                    setIsRateLimited(true);
                } else {
                    toast.error("Error fetching notes. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

                {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

                {notes.length !== 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage