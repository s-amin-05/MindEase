// This is the full, corrected code for app/_layout.jsx

import React, { useContext, useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router'; // Import Stack
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { Text } from 'react-native';

const InitialLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    
    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      router.replace('/home');
    } else if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [user, loading, segments]);

  if (loading) {
    return <Text>Loading...</Text>; // Or a proper loading spinner
  }
  return <Slot/>;

//   // ✅ THE FIX IS HERE: We replace <Slot /> with the main <Stack /> navigator
//   return (
//     <Stack>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="Journal" options={{ headerShown: false }} />
//     </Stack>
//   );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;