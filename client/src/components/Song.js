import React from 'react';

const Song = ({ song }) => {
    return (
        <div className='flex-col border-spacing-5 border'>
            <h3>{song.name}</h3>
            <li className='flex'>{song.artists.map(a => (<ul key={a.name}>{a.name}</ul>))}</li>
        </div>
    );
};

export default Song;
