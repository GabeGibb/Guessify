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
        songs = songs.filter((song, index) => songs.findIndex(s => s.track.id === song.track.id) === index);
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

    function handleOptionClick(song) {
        if (song === mysterySong) {
            setScore(score + 1); // Increase score by 1
        }else{
            setGameOver(true);
            // setDelay(30);
            return;
        }
        if (allSongs.length >= 4){
            randomizeSongs();
        }else{
            console.log('add more songs')
        }
        // randomizeSongs();
    }

    if (allSongs.length <= 0) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            {gameOver && <Popup isOpen={true} score={score} song={mysterySong}/>}
            <div className='flex flex-col'>
                <div className='self-end justify-evenly mx-4'> 
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
                            <button className='m-auto w-[90%] h-[100px]' onClick={() => handleOptionClick(song)} key={song.id}>
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
