import React, { useState, useRef, useEffect } from 'react';

function MysterySong({ song, delay }) {
    let localVol = 0.5;
    if (localStorage.getItem('volume') === null) {
        localStorage.setItem('volume', '0.5');
    }else{
        localVol = parseFloat(localStorage.getItem('volume'));
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(localVol);

    const tId = useRef();
    const audioRef = useRef();

    useEffect(() => {
        if (audioRef.current && volume){
            audioRef.current.volume = volume;
        }
        setIsPlaying(false);
        clearTimeout(tId.current);
        // eslint-disable-next-line
    }, [song]);

    function togglePlay() {
        clearTimeout(tId.current);
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        } else {
            audioRef.current.play();
            tId.current = setTimeout(() => {
                setIsPlaying(false);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }, delay * 1000);
        }
    };

    function handleVolumeChange(event) {
        setVolume(event.target.value);
        audioRef.current.volume = event.target.value;
        localStorage.setItem('volume', event.target.value.toString());
    };

    return (
        <div>
            
            <div className='relative'>
                <div className="rounded-[50%] border-solid border-[#1fd15f] border-[14.81px] w-[197px] h-[197px]"></div>
                <button onClick={togglePlay} className='absolute top-1/2 left-1/2 '>
                    {song && <audio ref={audioRef} src={song.preview_url} onEnded={() => setIsPlaying(false)}/>}
                    <svg className="rounded-none w-[86.64px] h-[87.26px] overflow-visible">             
                        <path d="M81.6733 41.5526C83.9975 42.9341 83.9443 46.317 81.5778 47.6247L27.7034 77.3942C25.3493 78.695 22.4688 76.965 22.5111 74.2757L23.474 13.0571C23.5163 10.3679 26.4498 8.72929 28.7618 10.1035L81.6733 41.5526Z" fill="white" stroke="black"/>
                    </svg>
                </button>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

export default MysterySong;
