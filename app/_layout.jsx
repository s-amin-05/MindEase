
import { useEffect } from 'react';
import { useAuth, AuthProvider } from '../context/AuthContext';
import { useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { Slot } from 'expo-router';

const InitialLayout = () => {
    const { user, initializing } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (initializing) return;

        const inAppGroup = segments[0] === '(app)';

        if (user && !inAppGroup) {
            router.replace('/home');
        } else if (!user && inAppGroup) {
            router.replace('/login');
        }
    }, [user, initializing, segments]);

    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return <Slot />;
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <InitialLayout />
        </AuthProvider>
    );
}
