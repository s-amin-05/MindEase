import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchJournalEntries = async (token) => {
  // If there's no token, we can't make an authenticated request.
  if (!token) {
    console.log('No auth token provided, cannot fetch journals.');
    // Return an empty array to trigger the dummy data fallback.
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/api/journals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Standard way to send a JWT
      },
    });

    // If the response is not OK (e.g., 401 Unauthorized, 500 Server Error)
    if (!response.ok) {
      // We throw an error to be caught by the calling component.
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // This will be an array of journal entries from your DB

  } catch (error) {
    console.error('Failed to fetch journal entries:', error);
    // You could show an alert here or let the component handle it.
    Alert.alert("Error", "Could not load your journals. Please check your connection.");
    // Re-throw the error so the component knows the fetch failed.
    throw error;
  }
};

export const createJournalEntry = async (entryData, token) => {
  if (!token) {
    throw new Error('No authentication token provided.');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/journals`, {
      method: 'POST', // Use POST for creating new resources
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(entryData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const newData = await response.json();
    return newData; // The new entry from the server, with a real _id and createdAt

  } catch (error) {
    console.error('Failed to create journal entry:', error);
    throw error; // Re-throw to be handled by the component
  }
};


export const getRecentJournal = async (token) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/api/journals/recent`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent journal:', error);
    throw error;
  }
};


export const updateJournalEntry = async (id, entryData, token) => {
  if (!token) {
    throw new Error('No authentication token provided.');
  }
  console.log(entryData)

  try {
    const response = await fetch(`${BASE_URL}/api/journals/${id}`, {
      method: 'PUT', // PUT is standard for updating an entire resource
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(entryData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const updatedData = await response.json();
    return updatedData;

  } catch (error) {
    console.error('Failed to update journal entry:', error);
    throw error; // Re-throw to be handled by the component
  }
};