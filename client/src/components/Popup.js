import {React, useEffect, useState} from 'react';
import MysterySong from './MysterySong';
import baseUrl from '../services/Url';

const Popup = ({ gameOver, score, song, restartCallback, artistPicUrl='' }) => {

    const [picUrl, setPicUrl] = useState('');
    const [popupScale, setPopupScale] = useState(1);
    // async function setArtistPicUrl(id){
    //     const response = await fetch(baseUrl + "artist?id=" +id, {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const data = await response.json();
    //     setPicUrl(data.images[0].url);
    // }

    useEffect(() => {
        if (song.album === undefined){
            // setArtistPicUrl(song.artists[0].id);
            setPicUrl(artistPicUrl);
        }else{
            setPicUrl(song.album.images[0].url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRefresh = () => {
        // window.location.reload();
        restartCallback();
    };

    const handleGoHome = () => {
        window.location.href = '/home';
    };
    
    // const changeScale = () => {
    //     if (window.innerWidth < 675){
    //         let scale = (1+(window.innerWidth / 675))/2;
    //         setPopupScale(scale);
        
    //         console.log(window.innerWidth)
    //     }
    // 

    // useEffect(() => {
    //     window.addEventListener('resize', changeScale);
    //     return () => {
    //         window.removeEventListener('resize', changeScale);
    //     };
    // }, []);
    

    return (
        <div>
            <div className='fixed w-full h-full left-0 top-0 bg-black/80 z-20'>
                <div className='w-full absolute top-[10%] left-1/2 transform -translate-x-1/2'>
                    <div className='relative max-w-[600px] sm:w-[80%] m-auto'>
                        <div className='absolute left-0 top-0 flex flex-col justify-evenly h-full w-full z-10'>
                            <h1 className='text-4xl sm:text-3xl sm:text-center font-bold w-[75%] m-auto'>Nice try!</h1>
                            <div className='w-[75%] m-auto flex flex-col  text-2xl sm:text-lg'>
                                <div className='inline-flex gap-2'>
                                    <h2>Song: </h2><h2>{song.name}</h2>
                                </div>
                                <div className='inline-flex gap-2'>
                                    <h2>Artist: </h2><h2>{song.artists[0].name}</h2>
                                </div>
                            </div>
                            <div className='w-[75%] m-auto flex flex-row justify-between sm:flex-col text-xl sm:text-lg'>
                                <div className='gap-2 flex items-center'>
                                    <h2>Final Score: </h2>
                                    <h2>{score}</h2>
                                </div>
                                {/* <div className='inline-flex gap-2'>
                                    <h2>Highest Score: </h2><h2>{score}</h2>
                                </div> */}
                                <div className='flex sm:scale-[60%] sm:m-auto'>
                                    <MysterySong song={song} delay={30}/>
                                </div>
                            </div>
                            <div className='w-[75%] m-auto inline-flex sm:flex-col sm:space-y-2 justify-between'>
                                <button className='w-[45%] sm:w-auto text-2xl sm:text-xl bg-[var(--spotify-green)] px-10 py-5 rounded-2xl' onClick={handleRefresh}>Try Again</button>
                                <button className='w-[45%] sm:w-auto text-2xl sm:text-xl bg-[#3D3E3F] px-10 py-5 rounded-2xl' onClick={handleGoHome}>Home</button>
                            </div>
                        </div>
                        <div className='w-full h-full bg-[#3D3E3F] border-white rounded-3xl border'>
                            {<div className='w-full h-full overflow-hidden rounded-3xl'>
                                <img className='w-full h-full object-cover object-center opacity-30' src={picUrl} alt='Popup Background'/>
                            </div>}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
