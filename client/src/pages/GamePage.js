import React, { useState, useEffect } from 'react';
import Song from '../components/Song';
import MysterySong from '../components/MysterySong';

function GamePage() {
    const [songs, setSongs] = useState([]);
    const [mysterySong, setMysterySong] = useState(null);

    const getSongs = async () => {
        const response = await fetch('http://localhost:1323/top-songs', {
            method: 'GET',
            credentials: 'include', 
        });

        const data = await response.json();
        console.log('Songs:', data.items);
        setSongs(data.items);

        //randomize song
        let randomSong = data.items[Math.floor(Math.random() * songs.length)];
        setMysterySong(randomSong.track);
    };

    useEffect(() => {
        getSongs();
    }, []);

    function handleSongClick(){
        let randomSong = songs[Math.floor(Math.random() * songs.length)];
        setMysterySong(randomSong.track);
    };


    return (
        <div>
            {songs.length > 0 && <MysterySong song={mysterySong} />}
            {songs.map((song) => (
                <button onClick={handleSongClick}><Song song={song.track}/></button>
            ))}
        </div>
    );
}

export default GamePage;
