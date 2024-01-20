import {React, useState} from 'react';
import baseUrl from '../services/Url';
import Compilation from './Compilation';

const CustomCompilation = () => {

    // function getUrlType(){
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const type = urlParams.get('type');
    //     return type;
    // }
    const [playlist, setPlaylist] = useState(null);

    function getPlaylistId(url){
        let id = url.split("playlist/")[1];
        id = id.split("?")[0];
        return id;
    }

    async function verifyPlaylist(id) {
        let apiUrl = baseUrl + 'playlist?id=' + id;
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response;
        
        if (data.status !== 200) {
            console.log('BAD')
        }
        else if (data.status === 200) {
            let dataJson = await data.json();
            setPlaylist(dataJson);
        }
    }

    const handleKeyDown = (event) => {
        if (event.code === "Enter") {
            verifyPlaylist(getPlaylistId(event.target.value));
        }
    };

    return (
        <div className="m-auto w-[90%]">
            <div className='text-center'>Enter a Playlist link</div>
            <input className='text-black w-full m-auto text-center' onKeyUp={handleKeyDown}></input>
            {playlist && <Compilation info={playlist} />}
        </div>
    );
};

export default CustomCompilation;
