import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import categoriesService from '@/api/services/categoriesService';
import showToastsUtil from '@/utils/showToastsUtil';
import CategoryItem from './CategoryItem';
import Spacer from './Spacer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadCategories } from '@/store/slices/categoriesSlice';
import { PAGE_PADDING } from '@/constants/Dimensions';

type Props = {
	isVisible: boolean;
	onClose: () => void;
	onSelect: (categoryId?: number) => void;
	selectedCategory?: number;
};

const SelectCategoryModal = ({
	isVisible,
	onClose,
	onSelect,
	selectedCategory,
}: Props) => {
	const insets = useSafeAreaInsets();
	const dispatch = useAppDispatch();

	const { categories } = useAppSelector((state) => state.category);

	useEffect(() => {
		categoriesService
			.getAllCategories()
			.then((response) => {
				if (response.success && response?.data) {
					dispatch(loadCategories(response.data.categories));
				} else {
					showToastsUtil.error(
						response?.message || 'Error fetching categories'
					);
				}
			})
			.catch((err) => {
				showToastsUtil.error(
					err?.message || 'Error fetching categories'
				);
			});
	}, []);

	return (
		<Modal
			deviceHeight={Dimensions.get('screen').height}
			isVisible={isVisible}
			statusBarTranslucent
			useNativeDriver
			useNativeDriverForBackdrop
			onBackButtonPress={onClose}
			onBackdropPress={onClose}
			style={styles.modal}
		>
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<ThemedView style={styles.innerContainer}>
					<ThemedText type="subtitle">Select A Category</ThemedText>

					<Spacer h={16} />

					<FlatList
						horizontal
						data={categories}
						keyExtractor={(item) => item.category_id.toString()}
						ListHeaderComponent={
							<CategoryItem
								uncategorized
								isActive={selectedCategory === undefined}
								onPress={() => onSelect(undefined)}
							/>
						}
						ListHeaderComponentStyle={{ marginRight: 10 }}
						renderItem={({ item }) => (
							<>
								<CategoryItem
									category={item}
									isActive={
										selectedCategory === item.category_id
									}
									onPress={() => onSelect(item.category_id)}
								/>
							</>
						)}
						ItemSeparatorComponent={() => <Spacer w={10} />}
					/>
				</ThemedView>
			</View>
		</Modal>
	);
};

export default SelectCategoryModal;

const styles = StyleSheet.create({
	modal: {
		margin: 0,
	},
	container: {
		flex: 1,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: PAGE_PADDING,
	},
	innerContainer: {
		minWidth: 300,
		minHeight: 120,
		padding: 15,
		borderRadius: 12,
	},
});
