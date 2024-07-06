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
	size?: 'small' | 'normal';
};

export function ThemedButton({
	style,
	lightColor,
	darkColor,
	label,
	loading,
	disabled = loading,
	variant = 'primary',
	size = 'normal',
	...otherProps
}: Props) {
	const getBtnBgColor = () => {
		switch (variant) {
			case 'primary':
				return 'buttonPrimaryBackground';
			case 'primary2':
				return 'secondary';
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
			case 'primary2':
				return 'black';
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

	const getSize = () => {
		switch (size) {
			case 'small':
				return { fontSize: 16, padding: 12 };
			case 'normal':
			default:
				return { fontSize: 18, padding: 15 };
		}
	};

	return (
		<TouchableNativeFeedback {...otherProps}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: btnBgColor,
						padding: getSize().padding,
					},
				]}
			>
				<View />

				{loading ? (
					<ActivityIndicator color={btnTextColor} />
				) : (
					<Text
						style={[
							styles.label,
							{
								color: btnTextColor,
								fontSize: getSize().fontSize,
							},
						]}
					>
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
		borderRadius: 12,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	label: {
		fontWeight: 500,
		letterSpacing: 0.3,
		flexShrink: 1,
	},
});
