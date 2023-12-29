import React, { useState, useEffect } from 'react';
import Song from '../components/Song';

function GamePage() {
    const [songs, setSongs] = useState([]);

    const getSongs = async () => {
        const response = await fetch('http://localhost:1323/top-songs', {
            method: 'GET',
            credentials: 'include', 
        });

        const data = await response.json();
        console.log('Songs:', data.items);
        setSongs(data.items);
    };

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <div>
            {songs.map((song) => (
                console.log(song.track),
                <Song song={song.track} />
            ))}
        </div>
    );
}

export default GamePage;