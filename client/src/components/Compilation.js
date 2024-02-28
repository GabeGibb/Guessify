import React, { useEffect } from 'react';
import baseUrl from '../services/Url';
import blankCover from '../media/blankCover.png';

const Compilation = ({ info }) => {

    async function routeToGame(){
        if (info.type === "artist"){
            const response = await fetch(baseUrl + 'artist-albums?id=' + info.id, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Token': sessionStorage.getItem('token'),
                },
            });
            const data = await response.json();
            console.log(data)
            let ids = ""
            for (let i = 0; i < data.items.length; i++){
                ids += data.items[i].id + ","
            }
            ids = ids.substring(0, ids.length - 1);
            window.location.href = "/game?type=" + info.type + "&id=" + ids;
        }
        else if (info.type === "playlist"){
            window.location.href = "/game?type=" + info.type + "&id=" + info.id;
        }else{
            window.location.href = "/game?time_range=" + info.time_range + "&type=user";
        }
    }

    return (
        <button onClick={routeToGame} className='w-32 hover:scale-110 transition-transform duration-200'>
            <img className='rounded-full' src={info.images.length > 0 ? info.images[0].url : blankCover} alt={info.name} />
            <p className='text-center'>{info.name}</p>
        </button>
    );
};

export default Compilation;
