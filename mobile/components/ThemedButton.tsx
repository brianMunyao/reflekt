import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableNativeFeedbackProps,
	View,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { IBtnVariant } from '@/types/IBtnVariant';

export type Props = TouchableNativeFeedbackProps & {
	lightColor?: string;
	darkColor?: string;

	label: string;
	loading?: boolean;

	variant?: IBtnVariant;
};

export function ThemedButton({
	style,
	lightColor,
	darkColor,
	label,
	loading,
	disabled = loading,
	variant = 'primary',
	...otherProps
}: Props) {
	const getBtnBgColor = () => {
		switch (variant) {
			case 'primary':
				return 'buttonPrimaryBackground';
			case 'danger':
				return 'dangerButtonBackground';
			case 'secondary':
				return 'secondaryButtonBackground';
			default:
				return 'buttonPrimaryBackground';
		}
	};
	const getBtnColor = () => {
		switch (variant) {
			case 'primary':
				return 'buttonPrimaryText';
			case 'danger':
				return 'dangerButtonText';
			case 'secondary':
				return 'secondaryButtonText';
			default:
				return 'buttonPrimaryText';
		}
	};

	const btnBgColor =
		disabled || loading
			? useThemeColor(
					{ light: lightColor, dark: darkColor },
					'buttonDisabledBackground'
			  )
			: useThemeColor(
					{ light: lightColor, dark: darkColor },
					getBtnBgColor()
			  );
	const btnTextColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		getBtnColor()
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

				{loading ? (
					<ActivityIndicator color={btnTextColor} />
				) : (
					<Text style={[styles.label, { color: btnTextColor }]}>
						{label}
					</Text>
				)}

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
