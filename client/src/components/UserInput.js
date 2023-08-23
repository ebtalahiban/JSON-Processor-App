import React, { useState } from 'react';
import axios from 'axios';
import './UserInput.css';

const UserInput = () => {
  const [userText, setUserText] = useState('');
  const [backendResponse, setBackendResponse] = useState('');

  const handleTextChange = (event) => {
    setUserText(event.target.value);
  };

  const sendQueryToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/query', { userText });
      setBackendResponse(response.data.userText); 
    } catch (error) {
      console.error('Error querying backend:', error);
    }
  };

  return (
    <div className="user-input">
      <h2>User Editable Text</h2>
      <textarea
        rows="4"
        cols="50"
        className="user-input-textarea"
        value={userText}
        onChange={handleTextChange}
      />
      <button className="user-input-button" onClick={sendQueryToBackend}>
        Query Backend
      </button>
      <div className="backend-response">
        {backendResponse && (
          <div>
            <h3>Backend Response:</h3>
            <p>{backendResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInput;
