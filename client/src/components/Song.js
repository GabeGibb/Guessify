import React from 'react';

const Song = ({ song }) => {
    return (
        <div className='flex-col bg-spotify rounded-[15px] border-solid border-[#ffffff] border w-[385px] h-[110px] relative'>
            <h3>{song.name}</h3>
            <li className='flex justify-center space-x-5'>{song.artists.map(a => (<ul key={a.name}>{a.name}</ul>))}</li>
        </div>
    );
};

export default Song;
