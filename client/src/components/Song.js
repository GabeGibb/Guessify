import React from 'react';

const Song = ({ song }) => {
    const artistsSubset = song.artists.slice(0, 3);

    return (
        <div className='flex flex-col justify-center rounded-[15px] border border-solid border-[#ffffff] h-full z-20 hover:bg-[#212121]'>
            <h2 className='font-bold pointer-events-none'>{song.name}</h2>
            <li className='flex justify-center space-x-5 text-white pointer-events-none'>
                {artistsSubset.map(a => (<ul className='' key={a.name}>{a.name}</ul>))}
            </li>
        </div>
    );
};

export default Song;
