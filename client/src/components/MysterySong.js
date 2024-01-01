import React, { useState } from 'react';

function MysterySong({ song }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    function handleClick() {
        setIsPlaying(!isPlaying);
    };

    function handleAudioEnded() {
        setIsPlaying(false);
    };

    function handleVolumeChange(event) {
        console.log(event.target.value)
        setVolume(event.target.value);
    };

    return (
        <div>
            <button onClick={handleClick} className='flex'>
                {isPlaying ? 'Pause' : 'Play'}
                {isPlaying && <audio src={song.preview_url} autoPlay onEnded={handleAudioEnded} volume={volume} />}
            </button>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

export default MysterySong;
