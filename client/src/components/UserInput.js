import React, { useState } from 'react';
import './UserInput.css';

const UserInput = () => {
  const [userText, setUserText] = useState('');

  const handleTextChange = (event) => {
    setUserText(event.target.value);
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
    </div>
  );
};

export default UserInput;
