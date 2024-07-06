import {
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ICategory } from '@/types/ICategory';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

type Props = {
	category: ICategory;
	onEditClick?: () => void;
	onDeleteClick?: () => void;
};

const ListCategoryItem = ({ category, onEditClick, onDeleteClick }: Props) => {
	const blueColor = useThemeColor({}, 'blue');
	const dangerColor = useThemeColor({}, 'dangerButtonText');

	const greyText = useThemeColor({}, 'secondaryButtonText');
	const greyBg = useThemeColor({}, 'secondaryButtonBackground');

	return (
		<View style={styles.container}>
			<View style={[styles.iconContainer, { backgroundColor: greyBg }]}>
				<Ionicons
					name={category.icon as any}
					size={20}
					color={greyText}
				/>
			</View>

			<View style={{ flex: 1 }}>
				<ThemedText style={styles.name}>{category.name}</ThemedText>
			</View>

			<TouchableWithoutFeedback onPress={onEditClick}>
				<View
					style={[styles.optionsIcon, { backgroundColor: blueColor }]}
				>
					<Ionicons
						name={'create-outline'}
						size={20}
						color={'#fff'}
					/>
				</View>
			</TouchableWithoutFeedback>

			<TouchableWithoutFeedback onPress={onDeleteClick}>
				<View
					style={[
						styles.optionsIcon,
						{ backgroundColor: dangerColor },
					]}
				>
					<Ionicons name={'trash-outline'} size={20} color={'#fff'} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default ListCategoryItem;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	iconContainer: {
		width: 55,
		height: 55,
		borderRadius: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	name: {
		fontSize: 18,
	},
	optionsIcon: {
		width: 38,
		height: 38,
		borderRadius: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
