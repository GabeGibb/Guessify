import React from 'react';

const Compilation = ({ image, name }) => {
    return (
        <div>
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    );
};

export default Compilation;
