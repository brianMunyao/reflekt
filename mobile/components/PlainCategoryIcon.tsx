import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
	name: string;
	onPress: () => void;
	isActive?: boolean;
};

const PlainCategoryIcon = ({ name, onPress, isActive }: Props) => {
	const color = useThemeColor({}, 'primary');
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={[
					styles.container,
					{ borderColor: isActive ? color : 'transparent' },
				]}
			>
				<Ionicons
					name={name as any}
					size={27}
					color={isActive ? color : ''}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PlainCategoryIcon;

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		borderRadius: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
	},
});
