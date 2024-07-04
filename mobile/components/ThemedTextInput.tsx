import { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	TextInputProps,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

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
};

export function ThemedTextInput({
	style,
	lightColor,
	darkColor,
	label,
	placeholder,
	touched,
	error,

	leftIcon,
	rightIcon,

	...otherProps
}: Props) {
	const inputBackground = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'inputBackground'
	);
	const inputTextColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'inputText'
	);

	// handle secureEntryModes
	const [isSecureEntryOff, setIsSecureEntryOff] = useState(false);
	const toggleVisibility = () => setIsSecureEntryOff((value) => !value);

	const _rightIcon = otherProps.secureTextEntry
		? isSecureEntryOff
			? 'eye-outline'
			: 'eye-off-outline'
		: undefined;

	return (
		<View style={[styles.container]}>
			{label && <ThemedText style={styles.label}>{label}</ThemedText>}

			<View style={styles.inputContainer}>
				<TextInput
					placeholder={placeholder}
					style={[
						{
							backgroundColor: inputBackground,
							color: inputTextColor,
						},
						styles.input,
						{ paddingRight: _rightIcon ? 40 : 15 },
					]}
					{...otherProps}
					secureTextEntry={
						otherProps.secureTextEntry ? !isSecureEntryOff : false
					}
				/>

				{_rightIcon && (
					<TouchableWithoutFeedback
						onPress={
							otherProps.secureTextEntry
								? toggleVisibility
								: undefined
						}
					>
						<View style={styles.rightIcon}>
							<Ionicons
								name={_rightIcon as any}
								size={28}
								color="grey"
							/>
						</View>
					</TouchableWithoutFeedback>
				)}
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
	label: {
		marginLeft: 5,
	},
	container: {},
	inputContainer: {
		position: 'relative',
	},
	rightIcon: {
		position: 'absolute',
		right: 10,
		transform: 'translateY(13px)',
	},
	input: {
		paddingVertical: 13,
		paddingHorizontal: 15,
		fontSize: 16,
		borderRadius: 12,
	},
	error: {
		marginLeft: 5,
	},
});
