import React, { useState } from 'react';

const MysterySong = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div onClick={handleClick} className='flex'>
            {isPlaying ? 'Pause' : 'Play'}
            <h1>PLAY</h1>
            {isPlaying && <audio src={song.preview_url} autoPlay />}
        </div>
    );
};

export default MysterySong;
