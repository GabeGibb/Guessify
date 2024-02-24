import {React, useState} from 'react';
import baseUrl from '../services/Url';
import Compilation from './Compilation';
import { AutoComplete } from 'primereact/autocomplete';
import './Dropdown.css';

const SearchArtist = () => {

    const [artists, setArtists] = useState([]);
    const [artistData, setArtistData] = useState([]);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [artist, setArtist] = useState(null);

    async function searchArtists() {
        if (autocompleteValue.length < 1) {
            setArtists([]);
            return;
        }
        
        let apiUrl = baseUrl + 'search-artist?name=' + autocompleteValue.replace(/ /g, '+');
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setArtistData(data.artists.items);
        let artists = data.artists.items.map((artist) => {
            console.log(artist)
            return artist.name;
        })
        console.log(artists)
        setArtists(artists);
    }

    function pickArtist(event){
        for (let i = 0; i < artistData.length; i++) {
            if (artistData[i].name === event.value) {
                setArtist(artistData[i]);
            }
        }
    }

    return (
        <div className="m-auto w-[60%] lg:w-[90%]">
            <div className='text-center'>Lookup An Artist</div>

            <AutoComplete value={autocompleteValue} suggestions={artists} completeMethod={searchArtists} 
            onSelect={pickArtist} onChange={(e) => setAutocompleteValue(e.value)} placeholder="Search for an artist"/>
            
            
            {artist && <Compilation info={artist} />}
        </div>
    );
};

export default SearchArtist;
