import React, { useEffect } from 'react';
import baseUrl from '../services/Url';

const Verification = () => {
    async function verify() {
        const response = await fetch(baseUrl+'verify-user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Token': sessionStorage.getItem('token'),
            },
            
        });

        const data = await response;
        console.log("STATUS", data.status)
        
        if (data.status !== 200 && window.location.pathname !== "/") {
            window.location.pathname = "/";
        }
        else if (data.status === 200 && window.location.pathname === "/") {
            window.location.pathname = "/home";
        }
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <div>
        </div>
    );
};

export default Verification;
