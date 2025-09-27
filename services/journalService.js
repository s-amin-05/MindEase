import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;


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
