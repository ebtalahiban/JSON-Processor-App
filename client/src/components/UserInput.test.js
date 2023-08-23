import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // You can also use a mock for axios if needed
import UserInput from './UserInput';

describe('UserInput', () => {
    it('renders the component', () => {
      render(<UserInput />);
      // You can add more specific assertions here if needed
    });
  
    it('updates the userText state when typing in the textarea', () => {
      render(<UserInput />);
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'Test input' } });
      expect(textarea.value).toBe('Test input');
    });
  
    // Add more test cases for different user interactions and scenarios
  });
  
  