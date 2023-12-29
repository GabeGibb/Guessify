import React, { useState, useEffect } from 'react';
import Song from '../components/Song';
import MysterySong from '../components/MysterySong';

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
            {songs.length > 0 && <MysterySong song={songs[Math.floor(Math.random() * songs.length)].track} />}
            {songs.length > 0 && console.log(songs)}
            {songs.map((song) => (
                <Song song={song.track} />
            ))}
        </div>
    );
}

export default GamePage;