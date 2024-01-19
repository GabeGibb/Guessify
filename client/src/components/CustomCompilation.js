import {React, useEffect, useState} from 'react';


const CustomCompilation = () => {

    function getUrlType(){
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        return type;
    }

    const handleKeyDown = (event) => {
        if (event.code === "Enter") {
            console.log(event.target.value)
            // Call the get request function here
            // Example: getRequest();
        }
    };

    return (
        <div>
            <input className='text-black' onKeyUp={handleKeyDown}></input>
        </div>
    );
};

export default CustomCompilation;
