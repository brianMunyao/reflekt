import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { IFilterMode } from '@/types/IFilterMode';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
	filterMode: IFilterMode;
	overrideLabel?: string;
	onPress: (mode: IFilterMode) => void;
	isSelected?: boolean;
};

const TimeIntervalIcon = ({
	filterMode,
	overrideLabel,
	onPress,
	isSelected,
}: Props) => {
	const getLabel = () => {
		switch (filterMode) {
			case 'all':
				return { icon: '∞', label: 'All time' };
			case 'weekly':
				return { icon: '7', label: 'Weekly' };

			case 'monthly':
				return { icon: '31', label: 'Monthly' };

			case 'daily':
			default:
				return { icon: '1', label: 'Daily' };
		}
	};

	const color = useThemeColor({}, 'primary');

	return (
		<TouchableWithoutFeedback onPress={() => onPress(filterMode)}>
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<Ionicons
						name="calendar-clear-outline"
						size={50}
						color={isSelected ? color : ''}
					/>
					<ThemedText style={styles.textIcon}>
						{getLabel().icon}
					</ThemedText>
				</View>

				<ThemedText
					style={{
						textAlign: 'center',
						color: isSelected ? color : '',
					}}
				>
					{overrideLabel || getLabel().label}
				</ThemedText>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default TimeIntervalIcon;

const styles = StyleSheet.create({
	container: {
		width: 110,
		display: 'flex',
		alignItems: 'center',
		flex: 1,
	},
	iconContainer: {
		position: 'relative',
		width: 50,
	},
	textIcon: {
		position: 'absolute',
		top: '33%',
		left: '33%',
	},
});
