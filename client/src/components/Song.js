import React, { useState } from 'react';

const Song = ({ song }) => {
    // const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        // setIsPlaying(!isPlaying);
    };

    return (
        <div onClick={handleClick} className='flex'>
            <h3>{song.name}</h3>
            <li className='flex'>{song.artists.map(a => (<ul key={a.name}>{a.name}</ul>))}</li>
        </div>
    );
};

export default Song;
