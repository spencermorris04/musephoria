"use client";

import { useState } from 'react';
import { useSession, signIn } from "next-auth/react";

export default function SongEngine() {
    const [instrumentationFeedback, setInstrumentationFeedback] = useState('');
    const [lyricsFeedback, setLyricsFeedback] = useState('');
    const [vocalsFeedback, setVocalsFeedback] = useState('');
    const [productionFeedback, setProductionFeedback] = useState('');
    const [otherFeedback, setOtherFeedback] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio('/path-to-your-song.mp3'));

    // Get the session using the useSession hook
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            signIn();
        },
    });

    // Music Player Controls
    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process feedback data here
        console.log({
            instrumentationFeedback,
            lyricsFeedback,
            vocalsFeedback,
            productionFeedback,
            otherFeedback,
        });
    };

    return (
        <div className="container mx-auto p-4">
            {/* Music Player */}
            <div className="music-player">
                <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            </div>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit} className="feedback-form mt-4">
                <div className="mb-4">
                    <label htmlFor="instrumentationFeedback">Instrumentation Feedback</label>
                    <textarea className="bg-slate-500" id="instrumentationFeedback" value={instrumentationFeedback} onChange={(e) => setInstrumentationFeedback(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="lyricsFeedback">Lyrics Feedback</label>
                    <textarea className="bg-slate-500" id="lyricsFeedback" value={lyricsFeedback} onChange={(e) => setLyricsFeedback(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="vocalsFeedback">Vocals Feedback</label>
                    <textarea className="bg-slate-500" id="vocalsFeedback" value={vocalsFeedback} onChange={(e) => setVocalsFeedback(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="productionFeedback">Production Feedback</label>
                    <textarea className="bg-slate-500" id="productionFeedback" value={productionFeedback} onChange={(e) => setProductionFeedback(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="otherFeedback">Other Feedback</label>
                    <textarea className="bg-slate-500" id="otherFeedback" value={otherFeedback} onChange={(e) => setOtherFeedback(e.target.value)} />
                </div>
                <button type="submit" className="bg-slate-600 text-white p-2 rounded">Submit Feedback</button>
            </form>
        </div>
    );
}
