import React, { useState } from 'react';

const MysterySong = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <button onClick={handleClick} className='flex'>
            {isPlaying ? 'Pause' : 'Play'}
            {isPlaying && <audio src={song.preview_url} autoPlay />}
        </button>
    );
};

export default MysterySong;
