import React, { useState, useEffect } from 'react';
const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.addEventListener('load', () => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div className={`loading ${isLoading ? 'show' : 'hide'}`}>
            {isLoading ? <h2>Loading...</h2> : null}
        </div>
    );
};

export default Loading;
