import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInput.css';

const UserInput = () => {
  const [userText, setUserText] = useState('');
  const [backendResponse, setBackendResponse] = useState('');
  const [jsonResponse, setJsonResponse] = useState(null); 
  const [processedResponse, setProcessedResponse] = useState(null); // New state for processed response

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

      // Process the JSON response
      if (response.data) {
        const processed = processResponse(response.data);
        setProcessedResponse(processed); // Set the processed response in state
      }
    } catch (error) {
      console.error('Error querying backend:', error);
    }
  };

  const processResponse = (obj) => {
    const sortStringDescending = (str) => {
      return str.split('').sort((a, b) => b.localeCompare(a)).join('');
    };

    const processLayer = (layer, depth) => {
      const processedLayer = {};
      processedLayer['objectCount'] = Object.keys(layer).length;

      const sortedKeys = Object.keys(layer).sort((a, b) => b.localeCompare(a)); // Sort keys in descending order
      for (const key of sortedKeys) {
        const processedKey = `${sortStringDescending(key)} ${depth}`;
        if (typeof layer[key] === 'object') {
          processedLayer[processedKey] = processLayer(layer[key], depth + 1);
        } else if (typeof layer[key] === 'string') {
          processedLayer[processedKey] = sortStringDescending(layer[key]);
        } else {
          processedLayer[processedKey] = layer[key];
        }
      }
      return processedLayer;
    };

    return processLayer(obj, 1);
  };

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
      <div className="processed-response">
        {processedResponse && (
          <div>
            <h3>Processed Response:</h3>
            <pre>{JSON.stringify(processedResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInput;
