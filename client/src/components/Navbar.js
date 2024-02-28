import React from 'react';

function Navbar(){
    return (
        <nav className='p-4 bg-black'>
            <a href='home' className='flex justify-evenly text-5xl sm:text-3xl font-bold text-[var(--spotify-green)]'>GUESSIFY</a>
        </nav>
    );
};

export default Navbar;
