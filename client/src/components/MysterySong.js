import React, { useState, useRef, useEffect } from 'react';

function MysterySong({ song, delay}) {
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
    const ringRef = useRef();

    function stopSong(){
        if (audioRef.current && volume){
            audioRef.current.volume = volume;
        }
        setIsPlaying(false);
        clearTimeout(tId.current);
        ringRef.current.classList.remove('triggerRing');
    }

    useEffect(() => {
        stopSong();
        // eslint-disable-next-line
    }, [song]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    function handleKeyDown(event) {
        if (event.code === 'Space') {
            togglePlay();
        }
    }

    function togglePlay() {
        clearTimeout(tId.current);
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            ringRef.current.classList.remove('triggerRing');
        } else {
            audioRef.current.play();
            ringRef.current.classList.add('triggerRing');
            ringRef.current.style.animationDuration = `${delay}s`;
            tId.current = setTimeout(() => {
                if (!audioRef.current){
                    return;
                }
                setIsPlaying(false);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                ringRef.current.classList.remove('triggerRing');
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
                <svg height="220" width="220">
                    <circle className='greyRing' cx="110" cy="110" r="95" />
                </svg>
                <svg className='absolute top-0 -rotate-90' height="220" width="220">
                    <circle className='greenRing' ref={ringRef} cx="110" cy="110" r="95" />
                </svg>
                {/* <div className="rounded-[50%] border-solid border-[#1fd15f] border-[14.81px] w-[197px] h-[197px]"></div> */}
                <button onClick={togglePlay} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    {song && <audio ref={audioRef} src={song.preview_url} onEnded={() => setIsPlaying(false)}/>}
                    <svg className="rounded-none w-[86.64px] h-[87.26px] overflow-visible">             
                        <path d="M81.6733 41.5526C83.9975 42.9341 83.9443 46.317 81.5778 47.6247L27.7034 77.3942C25.3493 78.695 22.4688 76.965 22.5111 74.2757L23.474 13.0571C23.5163 10.3679 26.4498 8.72929 28.7618 10.1035L81.6733 41.5526Z" fill="white" stroke="black"/>
                    </svg>
                </button>
            </div>
            <div className='inline-flex justify-evenly w-full'>
                <svg className="w-[30.18px] h-[22px] relative overflow-visible">
                    <path d="M25.3812 0C26.8888 1.4059 28.0924 3.1058 28.9177 4.99483C29.743 6.88386 30.1725 8.92195 30.1797 10.9834C30.1869 13.0448 29.7717 15.0859 28.9596 16.9806C28.1475 18.8753 26.9558 20.5836 25.458 22M21.2647 4.41442C22.1693 5.25796 22.8914 6.2779 23.3866 7.41132C23.8818 8.54474 24.1395 9.7676 24.1438 11.0045C24.1481 12.2413 23.899 13.4659 23.4117 14.6028C22.9245 15.7396 22.2094 16.7646 21.3108 17.6144M8.26972 16.177L10.7976 19.3053C12.1154 20.9361 12.7743 21.7514 13.3516 21.8402C13.8513 21.917 14.3563 21.7385 14.6967 21.3647C15.0899 20.9328 15.0899 19.8845 15.0899 17.7878V4.28433C15.0899 2.18766 15.0899 1.13933 14.6967 0.707467C14.3563 0.333617 13.8513 0.155081 13.3516 0.231918C12.7743 0.320679 12.1154 1.13606 10.7976 2.76683L8.26972 5.89513C8.0035 6.22457 7.87039 6.38929 7.70569 6.50782C7.55977 6.61283 7.39627 6.69093 7.22288 6.73842C7.02717 6.79202 6.81539 6.79202 6.39182 6.79202H4.24404C3.10293 6.79202 2.53238 6.79202 2.0713 6.94435C1.1639 7.24411 0.452087 7.95592 0.152323 8.86332C0 9.32441 0 9.89496 0 11.0361C0 12.1772 0 12.7477 0.152323 13.2088C0.452087 14.1162 1.1639 14.828 2.0713 15.1278C2.53238 15.2801 3.10293 15.2801 4.24404 15.2801H6.39182C6.81539 15.2801 7.02717 15.2801 7.22288 15.3337C7.39627 15.3812 7.55977 15.4593 7.70569 15.5643C7.87039 15.6828 8.0035 15.8475 8.26972 16.177Z" stroke="#D9D9D9" strokeWidth="2.41439"/>
                </svg>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
            </div>
            
        </div>
    );
};

export default MysterySong;
