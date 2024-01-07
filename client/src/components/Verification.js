import React, { useEffect } from 'react';
import baseUrl from '../services/Url';

const Verification = () => {
    async function verify() {
        const response = await fetch(baseUrl+'verify-user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        const data = await response;
        console.log(data)
        // console.log("STATUS", data.status)
        // console.log(window.location)
        // if (data.status !== 200 && window.location.pathname !== "/") {
        //     window.location.pathname = "/";
        // }
    }

    useEffect(() => {
        if (window.location.pathname !== "/"){
            verify();
        }
    }, []);

    return (
        <div>
        </div>
    );
};

export default Verification;
