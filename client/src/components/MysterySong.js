import React, { useState, useRef, useEffect } from 'react';

function MysterySong({ song }) {
    let localVol = 0.5;
    if (localStorage.getItem('volume') === null) {
        localStorage.setItem('volume', '0.5');
    }else{
        localVol = parseFloat(localStorage.getItem('volume'));
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(localVol);

    const audioRef = useRef();

    useEffect(() => {
        setIsPlaying(false);
    }, [song]);

    function handleClick() {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    function handleVolumeChange(event) {
        setVolume(event.target.value);
        audioRef.current.volume = event.target.value;
        localStorage.setItem('volume', event.target.value.toString());
    };

    return (
        <div>
            <button onClick={handleClick} className='flex'>
                {isPlaying ? 'Pause' : 'Play'}
                {song && <audio ref={audioRef} src={song.preview_url} onEnded={() => setIsPlaying(false)}/>}
            </button>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

export default MysterySong;
