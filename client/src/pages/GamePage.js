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
    const [permSongs, setPermSongs] = useState([]);
    const [allSongs, setSongs] = useState([]);
    const [mysterySong, setMysterySong] = useState(null);
    const [songOptions, setSongOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [delay, setDelay] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [artistPicUrl, setArtistPicUrl] = useState('');

    let answer = null;
    function addTrackWrapperArtist(data){
        let songs = [];
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
        return songs;
    }

    function addTrackWrapperSongs(data){
        let songs = [];
        for(let i = 0;  i < data.length; i++){
            //Stupid process to get songs in a track wrapper
            songs.push({track: data[i]});
            
        }
        return songs;
    }
    

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

                songs = await response.json();
                
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
                
                if (offset + 49 > data.total) {
                    offset += data.total - 49;
                } else {
                    offset += 49;
                }
                
                count += data.items.length;
                if (count >= data.total) {
                    break;
                }
            }
        }
        if (type === 'artist') {
            songs = addTrackWrapperArtist(songs);
        }else if (type === 'user'){
            songs = addTrackWrapperSongs(songs);
        }

        //Filter out songs without audio or duplicates
        songs = songs.filter((song) => song.track.preview_url !== null);
        songs = songs.filter((song, index) => {
            const duplicateIndex = songs.findIndex(s => s.track.id === song.track.id);
            const duplicateNameIndex = songs.findIndex(s => s.track.name === song.track.name);
            return index === duplicateIndex && index === duplicateNameIndex;
        });
        setSongs(songs);
        setPermSongs([...songs]);
        console.log(songs.length)

        if (type === 'artist'){
            getArtistPicUrl(songs[0].track.artists[0].id);
        }

    };

    async function getArtistPicUrl(id){
        const response = await fetch(baseUrl + "artist?id=" +id, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setArtistPicUrl(data.images[0].url);
    }

    useEffect(() => {
        if (allSongs.length > 0) {
            randomizeSongs();
        }
        // eslint-disable-next-line
    }, [allSongs]);

    useEffect(() => {
        getSongs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function restartGame(){
        setSongs([...permSongs]);
    }

    useEffect(() => {
        if (gameOver) {
            setGameOver(false);
            setScore(0);
            randomizeSongs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSongs]);

    return (
        <div>
            {gameOver && <Popup gameOver={gameOver} score={score} song={mysterySong} restartCallback={restartGame} artistPicUrl={artistPicUrl}/>}
            <div className='flex flex-col'>
                <div className='self-center justify-evenly mx-4 flex flex-row gap-4 my-4' > 
                    <div className='bg-black border rounded w-40'>
                        <h1 className='text-[#1fd15e] p-2 font-semibold'>score: {score}</h1>
                    </div>
                    <div className='bg-black border rounded w-40'>
                        <h1 className='text-[#1fd15e] p-2 font-semibold'>duration: {delay}</h1>
                    </div>
                </div>
                <div className='flex m-auto sm:scale-90'>
                    {!gameOver && <MysterySong song={mysterySong} delay={delay}/>}
                </div>
                <div>
                    <div className='grid sm:grid-cols-1 grid-cols-2 w-7/8 max-w-[1000px] m-auto gap-5 mt-14'>
                        {songOptions.map((song) => (
                            <button className='m-auto w-[90%] h-[100px] sm:h-[80px]' onClick={(e) => handleOptionClick(song, e.target)} key={song.id}>
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
