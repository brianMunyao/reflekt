import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export type Props = TextInputProps & {
	lightColor?: string;
	darkColor?: string;

	label?: string;
	placeholder?: string;
	touched?: boolean;
	error?: string;

	leftIcon?: string;
	rightIcon?: string;

	fontSize?: number;
	fontWeight?:
		| 'light'
		| 'normal'
		| 'bold'
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900'
		| 'ultralight'
		| 'thin'
		| 'medium';
};

export function PlainTextInput({
	style,
	lightColor,
	darkColor,
	label,
	placeholder,
	touched,
	error,

	leftIcon,
	rightIcon,

	fontSize,
	fontWeight,

	...otherProps
}: Props) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return (
		<View style={[styles.container]}>
			{label && <ThemedText style={styles.label}>{label}</ThemedText>}

			<View style={styles.inputContainer}>
				<TextInput
					placeholder={placeholder}
					style={[styles.input, { color, fontSize, fontWeight }]}
					{...otherProps}
				/>
			</View>

			{error && touched && (
				<ThemedText type="error" style={[styles.error]}>
					{error}
				</ThemedText>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	label: {
		marginLeft: 5,
	},
	inputContainer: {
		position: 'relative',
	},
	rightIcon: {
		position: 'absolute',
		right: 10,
		transform: 'translateY(13px)',
	},
	input: {
		paddingHorizontal: 10,
		fontSize: 16,
		color: 'red',
	},
	error: {
		marginLeft: 5,
	},
});
