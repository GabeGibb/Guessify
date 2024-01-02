import React, { useState, useRef, useEffect } from 'react';

function MysterySong({ song, delay }) {
    let localVol = 0.5;
    if (localStorage.getItem('volume') === null) {
        localStorage.setItem('volume', '0.5');
    }else{
        localVol = parseFloat(localStorage.getItem('volume'));
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(localVol);

    const tId = useRef();
    const audioRef = useRef();

    console.log(delay)
    useEffect(() => {
        setIsPlaying(false);
        clearTimeout(tId.current);
    }, [song]);

    
    function togglePlay() {
        clearTimeout(tId.current);
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        } else {
            audioRef.current.play();
            tId.current = setTimeout(() => {
                setIsPlaying(false);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }, delay * 1000);
        }
    };

    function handleVolumeChange(event) {
        setVolume(event.target.value);
        audioRef.current.volume = event.target.value;
        localStorage.setItem('volume', event.target.value.toString());
    };

    return (
        <div>
            <button onClick={togglePlay} className='flex'>
                {isPlaying ? 'Pause' : 'Play'}
                {song && <audio ref={audioRef} src={song.preview_url} onEnded={() => setIsPlaying(false)}/>}
            </button>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

export default MysterySong;
