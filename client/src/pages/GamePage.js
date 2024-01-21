import React, { useState, useEffect } from 'react';
import Song from '../components/Song';
import MysterySong from '../components/MysterySong';
import baseUrl from '../services/Url';
import Popup from '../components/Popup';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const type = urlParams.get('type');
const term = urlParams.get('time_range');

let songsUrl = baseUrl + 'top-songs?time_range=' + term + '&offset=';
if (type === 'artist' && id) {
    songsUrl = baseUrl + 'multiple-artist-albums?id=' + id;
} else if (type === 'playlist' && id){
    songsUrl = baseUrl + 'playlist-songs?id=' + id + '&offset=';
}   


const maxSongs = 100;
const nextSongDelay = 250;

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
    const [delay, setDelay] = useState(5);
    const [gameOver, setGameOver] = useState(false);

    let answer = null;
    const getSongs = async () => {
        let offset = 0;
        let songs = [];
        let count = 0;
        while (count < maxSongs) {
            if (type === 'artist') {
                const response = await fetch(songsUrl, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                
                for(let i = 0;  i < data.albums.length; i++){
                    if (data.albums[i] != null){
                        //Stupid process to get songs in a track wrapper
                        let tempSongs = []
                        for (let j = 0; j < data.albums[i].tracks.items.length; j++){
                            tempSongs.push({track: data.albums[i].tracks.items[j]})
                        }
                        songs.push(...tempSongs);
                    }
                }
                break;

            }else{
                const response = await fetch(songsUrl + offset, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                const data = await response.json();
                console.log(songsUrl)
                console.log(data)
                songs.push(...data.items);
                
                if (offset + 50 > data.total) {
                    offset += data.total - 50;
                } else {
                    offset += 50;
                }
                
                count += data.items.length;
                if (count >= data.total) {
                    break;
                }
            }
        }
        console.log(songs)

        songs = songs.filter((song) => song.track.preview_url !== null);
        songs = songs.filter((song, index) => {
            const duplicateIndex = songs.findIndex(s => s.track.id === song.track.id);
            const duplicateNameIndex = songs.findIndex(s => s.track.name === song.track.name);
            return index === duplicateIndex && index === duplicateNameIndex;
        });
        setSongs(songs);
        console.log(songs.length)

    };

    useEffect(() => {
        if (allSongs.length > 0) {
            randomizeSongs();
        }
        // eslint-disable-next-line
    }, [allSongs]);

    useEffect(() => {
        getSongs();
    }, []);

    useEffect(() => {
        let curDelay = Math.max(5 - Math.sqrt(score), 0.2)
        curDelay= curDelay.toFixed(2);
        setDelay(curDelay);
    }, [score]);

    

    function randomizeSongs(){
        let randIndex = Math.floor(Math.random() * allSongs.length);
        let randomSong = allSongs[randIndex];
        console.log(randomSong)
        setMysterySong(randomSong.track);
        allSongs.splice(randIndex, 1)
        setSongs(allSongs);
        answer = randomSong.track;
        randomizeSongOptions();
    };
    
    function randomizeSongOptions(){
        let randomOptions = [];
        randomOptions.push(answer);
        // console.log(answer)
        let i = 0;
        while(i < 3){
            let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
            // console.log(randomSong)
            if (randomOptions.includes(randomSong.track)){
                continue;
            }
            randomOptions.push(randomSong.track);
            i++;
        }
        shuffleArray(randomOptions);
        setSongOptions(randomOptions);
    }

    function handleOptionClick(song, e) {
        if (song === mysterySong) {
            e.classList.add('text-[var(--spotify-green)]', 'border-[var(--spotify-green)]');
        }else{
            e.classList.add('text-[#ff0000]', 'border-[#ff0000]');
        }

        setTimeout(() => {
            if (song === mysterySong) {
                setScore(score + 1);
            }else{
                setGameOver(true);
                return;
            }
            if (allSongs.length >= 4){
                randomizeSongs();
            }else{
                console.log('add more songs')
            }
        }, nextSongDelay);
    }

    if (allSongs.length <= 0) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            {gameOver && <Popup gameOver={gameOver} score={score} song={mysterySong}/>}
            <div className='flex flex-col'>
                <div className=' self-center justify-evenly mx-4 flex-row' > 
                    <div className='bg-black border rounded w-40'>
                        <h1 className='text-[#1fd15e] p-2 font-semibold'>score: {score}</h1>
                    </div>
                    <div className='bg-black border rounded w-40'>
                        <h1 className='text-[#1fd15e] p-2 font-semibold'>duration: {delay}</h1>
                    </div>
                </div>
                <div className='flex m-auto'>
                    {!gameOver && <MysterySong song={mysterySong} delay={delay}/>}
                </div>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-7/8 max-w-[1000px] m-auto gap-5 mt-14'>
                        {songOptions.map((song) => (
                            <button className='m-auto w-[90%] h-[100px]' onClick={(e) => handleOptionClick(song, e.target)} key={song.id}>
                                <Song song={song}/>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePage;
