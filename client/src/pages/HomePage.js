
import {React, useState, useEffect} from "react";
import Compilation from "../components/Compilation";
import baseUrl from "../services/Url";

const topTracksCategories = [
    {name: "Top Tracks Short", type: "all", images: [], id: 1, time_range: "short_term"},
    {name: "Top Tracks Medium", type: "all", images: [], id: 2, time_range: "medium_term"},
    {name: "Top Tracks Long", type: "all", images: [], id: 3, time_range: "long_term"}
]

const HomePage = () => {
    const [artists, setArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    async function getArtists(){
        const response = await fetch(baseUrl + 'top-artists', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data.items)
        setArtists(data.items)
    }

    async function getPlaylists(){
        const response = await fetch(baseUrl + 'top-playlists', {
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
            <div className="flex">
                {artists && artists.map((artist) => (
                    <Compilation info={artist} key={artist.id}/>
                ))}
            </div>
            <div className="flex">
                {playlists && playlists.map((playlist) => (
                    playlist.images.length > 0 && <Compilation info={playlist} key={playlist.id}/>
                ))}
            </div>
            <div className="flex">
                {topTracksCategories.map((topTracks) => (
                    <Compilation info={topTracks} key={topTracks.id}/>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

