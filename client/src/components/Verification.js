import React, { useState, useEffect } from 'react';

const Verification = () => {
    async function verify() {
        const response = await fetch('http://localhost:1323/verify-user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        const data = await response;
        console.log("STATUS", data.status)
        if (data.status != 200) {
            window.location.href = "http://localhost:3000/";
        }
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <div>
            <h1>Verification Component</h1>
        </div>
    );
};

export default Verification;
