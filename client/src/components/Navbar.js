import React from 'react';

function Navbar(){
    return (
        <nav className='p-4 bg-black overflow-x-hidden'>
            <a href='home' className='flex justify-evenly text-5xl sm:text-3xl font-bold text-[var(--spotify-green)] hover:scale-110 transition-transform duration-200'>GUESSIFY</a>
        </nav>
    );
};

export default Navbar;
