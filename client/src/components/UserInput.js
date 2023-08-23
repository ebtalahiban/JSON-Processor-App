import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInput.css';

const UserInput = () => {
  const [userText, setUserText] = useState('');
  const [backendResponse, setBackendResponse] = useState('');
  const [jsonResponse, setJsonResponse] = useState(null); 

  useEffect(() => {
    const storedUserText = localStorage.getItem('userText');
    if (storedUserText) {
      setUserText(storedUserText);
    }
  }, []);

  const handleTextChange = (event) => {
    setUserText(event.target.value);
  };

  const sendQueryToBackend = async () => {
    console.log('Sending query to backend...');
    try {
      const response = await axios.post('http://localhost:5000/api/query', { userText });
      console.log('Response from backend:', response.data);
      setBackendResponse(response.data.userText);
      setJsonResponse(response.data); // Set the JSON response in state
    } catch (error) {
      console.error('Error querying backend:', error);
    }
  };

  // Save userText to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userText', userText);
  }, [userText]);

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
      <div className="json-response">
        {jsonResponse && (
          <div>
            <h3>URL Response:</h3>
            <pre>{JSON.stringify(jsonResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInput;
