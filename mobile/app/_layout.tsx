import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/contexts/AuthContext';
import ToastManager from 'toastify-react-native';
import { store } from '@/store/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<Provider store={store}>
				<ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<ToastManager />

					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="login" />
						<Stack.Screen name="register" />
						<Stack.Screen
							name="journal-entries/new"
							options={{
								presentation: 'modal',
							}}
						/>
						<Stack.Screen
							name="journal-entries/edit"
							options={{
								presentation: 'modal',
							}}
						/>
						<Stack.Screen name="update-user" />
						<Stack.Screen name="+not-found" />
					</Stack>
				</ThemeProvider>
			</Provider>
		</AuthProvider>
	);
}
