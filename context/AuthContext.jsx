
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Here you would typically verify the token with your backend
          // For this example, we'll just parse the stored user data
          const userData = JSON.parse(await AsyncStorage.getItem('userData'));
          setUser(userData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setInitializing(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
      } else {
        throw new Error(data.message || 'Failed to login');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
