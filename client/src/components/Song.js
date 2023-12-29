import React, { useState } from 'react';

const Song = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div onClick={handleClick} className='flex'>
            {isPlaying ? 'Pause' : 'Play'}
            <h3>{song.name}</h3>
            <li className='flex'>{song.artists.map(a => (<ul key={a.name}>{a.name}</ul>))}</li>
            {isPlaying && <audio src={song.preview_url} autoPlay />}
        </div>
    );
};

export default Song;
