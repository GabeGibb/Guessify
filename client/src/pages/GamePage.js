import React from 'react';

function GamePage() {
    const fetchToken = async () => {
      const response = await fetch('http://localhost:1323/token', {
        method: 'GET',
        credentials: 'include', // include credentials to send cookies
      });

      const data = await response.json();
      console.log('Token:', data);
    };
    fetchToken();

  return (
    <div>
        
    </div>
);
}

export default GamePage;