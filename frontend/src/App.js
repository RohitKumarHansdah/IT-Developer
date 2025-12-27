// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Call backend health endpoint
    api.get('/')
      .then(res => setMessage(res.data.message))
      .catch(err => {
        console.error(err);
        setMessage('Error connecting to backend');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>IT Developer Blog</h1>
      <p>Backend status: {message}</p>
    </div>
  );
}

export default App;
