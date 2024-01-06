
import {React, useState, useEffect} from "react";
import Compilation from "../components/Compilation";

const HomePage = () => {
    const [artists, setArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    async function getArtists(){
        const response = await fetch('http://localhost:1323/top-artists', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data.items)
        setArtists(data.items)
    }

    async function getPlaylists(){
        const response = await fetch('http://localhost:1323/top-playlists', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data.items)
        setPlaylists(data.items)
    }

    useEffect(() => {
        getArtists();
        getPlaylists();
    }, []);

    return (
        <div>
            {artists && artists.map((artist) => (
                <Compilation image={artist.images[0].url} name={artist.name} key={artist.id}/>
            ))}
            {playlists && playlists.map((playlist) => (
                playlist.images.length > 0 && <Compilation image={playlist.images[0].url} name={playlist.name} key={playlist.id}/>
            ))}
        </div>
    );
};

export default HomePage;

