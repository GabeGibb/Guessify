import React from 'react';
import MysterySong from './MysterySong';

const Popup = ({ isOpen, score, song }) => {
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        window.location.href = '/home';
    };
    console.log(song)

    return (
        <div>
        {isOpen && 
            <div className='fixed w-full h-full left-0 top-0 bg-black/80 z-20'>
                <div className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='test max-w-3xl m-auto flex flex-col'>
                        <h1>Nice try!</h1>
                        <div className='inline-flex gap-2'>
                            <h2>Final Score: </h2><h2>{score}</h2>
                        </div>
                        <div className='inline-flex gap-2'>
                            <h2>Highest Score:</h2><h2>{score}</h2>
                        </div>
                        <div>
                            <button onClick={handleRefresh}>Play Again</button>
                            <button onClick={handleGoHome}>Home</button>
                        </div>
                        <div className='absolute w-full aspect-square left-0 top-0 bg-[#3D3E3F] z-[-1]'>
                            {song.album.images[0].url && <img className='border border-white rounded-l opacity-50' src={song.album.images[0].url}/>}
                        </div>
                        
                    </div>
                </div>
            </div>
        }
        </div>
    );
};

export default Popup;
