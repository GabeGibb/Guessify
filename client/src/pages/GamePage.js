import React, { useState, useEffect } from 'react';
import Song from '../components/Song';
import MysterySong from '../components/MysterySong';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function GamePage() {
    const [allSongs, setSongs] = useState([]);
    const [mysterySong, setMysterySong] = useState(null);
    const [songOptions, setSongOptions] = useState([]);
    const [score, setScore] = useState(0);

    let answer = null;
    const getSongs = async () => {
        let offset = 0;
        let songs = [];
        let count = 0;
        // while (true){
            const response = await fetch('http://localhost:1323/top-songs?offset=' + offset, {
                method: 'GET',
                credentials: 'include', 
            });

            const data = await response.json();
            console.log('Songs:', data.items);
            if (offset + 50 > data.total){
                offset = data.total - 50;
            }else{
                offset += 50;
            }
            songs.push(data.items);
            count += offset;
            // if (count >= data.total){
            //     break;
            // }
            // console.log(count)
        // }
        setSongs(data.items);
    };

    useEffect(() => {
        if (allSongs.length > 0) {
            handleSongClick();
        }
    }, [allSongs]);

    useEffect(() => {
        getSongs();
    }, []);
    

    function handleSongClick(){
        let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
        setMysterySong(randomSong.track);
        answer = randomSong.track;
        randomizeSongOptions();
    };
    
    function randomizeSongOptions(){
        let randomOptions = [];
        randomOptions.push(answer);
        let i = 0;
        while(i < 3){
            let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
            if (randomOptions.includes(randomSong.track)){
                continue;
            }
            randomOptions.push(randomSong.track);
            i++;
        }
        shuffleArray(randomOptions);
        setSongOptions(randomOptions);
    }

    function handleOptionClick(song) {
        if (song === mysterySong) {
            setScore(score + 1); // Increase score by 1
        }
        handleSongClick();
    }
    
    return (
        <div>
            <h1>Score: {score}</h1> {/* Display the score */}
            <MysterySong song={mysterySong} />
            <div className='flex'>
                {songOptions.map((song) => (
                    <button onClick={() => handleOptionClick(song, answer)} key={song.name}>
                        <Song song={song}/>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GamePage;
