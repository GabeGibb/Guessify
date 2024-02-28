import React, { useState, useEffect } from 'react';
const Loading = () => {
    return (
        <div className='flex justify-center items-start translate-y-[20%] h-screen'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#1fd15e]'></div>
        </div>
    );
};

export default Loading;
