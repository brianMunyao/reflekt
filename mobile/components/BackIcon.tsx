import { TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
	lightColor?: string;
	darkColor?: string;
};

const BackIcon = ({ lightColor, darkColor }: Props) => {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	const goBack = () => {
		if (router.canGoBack()) {
			router.back();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={goBack}>
			<View>
				<Ionicons name="arrow-back" color={color} size={30} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default BackIcon;
