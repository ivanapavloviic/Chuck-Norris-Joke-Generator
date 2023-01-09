import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import MainPage from './MainPage';

jest.mock('axios');

test('renders a search form', () => {
  render(<MainPage />);
  const inputElement = screen.getByLabelText(/search/i);
  expect(inputElement).toBeInTheDocument();
});

test('displays search results when a search is performed', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      result: [
        { id: 'abc', value: 'fact 1' },
        { id: 'def', value: 'fact 2' },
      ]
    }
  });

  render(<MainPage />);
  const inputElement = screen.getByLabelText(/search/i);
  fireEvent.change(inputElement, { target: { value: 'test' } });
  fireEvent.submit(inputElement.form);

  await wait(() => {
    expect(screen.getByText(/fact 1/i)).toBeInTheDocument();
    expect(screen.getByText(/fact 2/i)).toBeInTheDocument();
  });
});

test('displays a random fact when no searches have been performed', () => {
  axios.get.mockResolvedValueOnce({
    data: {
      value: 'random fact'
    }
  });

  render(<MainPage />);
  expect(screen.getByText(/random fact/i)).toBeInTheDocument();
});
