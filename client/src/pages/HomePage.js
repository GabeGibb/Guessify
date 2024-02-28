
import {React, useState, useEffect} from "react";
import Compilation from "../components/Compilation";
import baseUrl from "../services/Url";
import CustomPlaylist from "../components/CustomPlaylist";
import SearchArtist from "../components/SearchArtist";
import Loading from "../components/Loading";

const topTracksCategories = [
    {name: "Top Tracks Short", type: "all", images: [], id: 1, time_range: "short_term"},
    {name: "Top Tracks Medium", type: "all", images: [], id: 2, time_range: "medium_term"},
    {name: "Top Tracks Long", type: "all", images: [], id: 3, time_range: "long_term"}
]



const HomePage = () => {
    const [artists, setArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    async function getArtists(){
        console.log(baseUrl + 'top-artists')
        const response = await fetch(baseUrl + 'top-artists', {
            method: 'GET',
            headers: {
                'Token': sessionStorage.getItem('token'),
            },
            credentials: 'include',

        });

        const data = await response.json();
        console.log(data.items)
        setArtists(data.items)
    }

    async function getPlaylists(){
        const response = await fetch(baseUrl + 'top-playlists', {
            method: 'GET',
            headers: {
                'Token': sessionStorage.getItem('token'),
            },
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data.items)
        setPlaylists(data.items)
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        if (token !== null) {
            sessionStorage.setItem('token', token);
        }
        getArtists();
        getPlaylists();
    }, []);

    if (playlists === null || artists === null){
        return (
            <Loading />
        );
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col">
                <SearchArtist />
                <CustomPlaylist />
            </div>
            {/* <div className="flex">
                {artists && artists.map((artist) => (
                    <Compilation info={artist} key={artist.id}/>
                ))}
            </div> */}
            <div className="flex items-start m-auto max-w-[95%]">
                {playlists && playlists.map((playlist) => (
                    playlist.images.length > 0 && <Compilation info={playlist} key={playlist.id}/>
                ))}
            </div>
            <div className="flex items-start m-auto max-w-[95%]">
                {topTracksCategories.map((topTracks) => (
                    <Compilation info={topTracks} key={topTracks.id}/>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

