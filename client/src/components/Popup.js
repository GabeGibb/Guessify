import React from 'react';
import MysterySong from './MysterySong';

const Popup = ({ isOpen, score, song }) => {
    let picUrl = '';
    if (song.album === undefined){
        picUrl = '';
    }else{
        picUrl = song.album.images[0].url;
    }

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
                <div className='w-full absolute top-[10%] left-1/2 transform -translate-x-1/2'>
                    <div className='relative max-w-[640px] md:m-auto m-10 '>
                        <div className='absolute left-0 top-0 flex flex-col justify-evenly h-full w-full z-10'>
                            <h1 className='text-5xl  font-bold w-[75%] m-auto'>Nice try!</h1>
                            <div className='w-[75%] m-auto flex flex-col text-2xl'>
                                <div className='inline-flex gap-2'>
                                    <h2>Song: </h2><h2>{song.name}</h2>
                                </div>
                                <div className='inline-flex gap-2'>
                                    <h2>Artist: </h2><h2>{song.artists[0].name}</h2>
                                </div>
                            </div>
                            <div className='w-[75%] m-auto flex flex-col text-2xl'>
                                <div className='inline-flex gap-2'>
                                    <h2>Final Score: </h2><h2>{score}</h2>
                                </div>
                                {/* <div className='inline-flex gap-2'>
                                    <h2>Highest Score: </h2><h2>{score}</h2>
                                </div> */}
                            </div>
                            <div className='flex m-auto scale-90 absolute right-[12.5%] translate-y-16'>
                                <MysterySong song={song} delay={30}/>
                            </div>
                            <div className='w-[75%] m-auto inline-flex justify-between'>
                                <button className='w-[45%] text-3xl bg-[var(--spotify-green)] px-10 py-5 rounded-2xl' onClick={handleRefresh}>Try Again</button>
                                <button className='w-[45%] text-3xl bg-[#3D3E3F] px-10 py-5 rounded-2xl' onClick={handleGoHome}>Home</button>
                            </div>
                        </div>
                        <div className='w-full bg-[#3D3E3F] border-white rounded-3xl border'>
                            {<img className='w-full aspect-[1] opacity-30 rounded-3xl' src={picUrl} alt='Popup Background'/>}
                        </div>
                        
                    </div>
                </div>
            </div>
        }
        </div>
    );
};

export default Popup;