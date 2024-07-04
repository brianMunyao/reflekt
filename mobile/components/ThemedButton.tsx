import {
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableNativeFeedbackProps,
	View,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type Props = TouchableNativeFeedbackProps & {
	lightColor?: string;
	darkColor?: string;

	label: string;
	loading?: boolean;
};

export function ThemedButton({
	style,
	lightColor,
	darkColor,
	label,
	loading,
	disabled = loading,
	...otherProps
}: Props) {
	const btnBgColor =
		disabled || loading
			? useThemeColor(
					{ light: lightColor, dark: darkColor },
					'buttonDisabledBackground'
			  )
			: useThemeColor(
					{ light: lightColor, dark: darkColor },
					'buttonPrimaryBackground'
			  );
	const btnTextColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'buttonPrimaryText'
	);

	return (
		<TouchableNativeFeedback {...otherProps}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: btnBgColor,
					},
				]}
			>
				<View />

				<Text style={[styles.label, { color: btnTextColor }]}>
					{label}
				</Text>

				<View />
			</View>
		</TouchableNativeFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		borderRadius: 12,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	label: {
		fontSize: 18,
		fontWeight: 500,
		letterSpacing: 0.3,
		flexShrink: 1,
	},
});