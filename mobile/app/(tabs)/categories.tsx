import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ThemedPage } from '@/components/ThemedPage';
import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { PAGE_PADDING } from '@/constants/Dimensions';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Divider from '@/components/Divider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import categoriesService from '@/api/services/categoriesService';
import showToastsUtil from '@/utils/showToastsUtil';
import {
	createCategory,
	deleteCategory,
	loadCategories,
	updateCategory,
} from '@/store/slices/categoriesSlice';
import ListCategoryItem from '@/components/ListCategoryItem';
import CategoryFormModal from '@/components/CategoryFormModal';
import { ICategory, ICategoryNew, ICategoryUpdate } from '@/types/ICategory';
import ConfirmationModal from '@/components/ConfirmationModal';

const CategoriesScreen = () => {
	const { categories } = useAppSelector((state) => state.category);
	const dispatch = useAppDispatch();

	const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
	const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
		useState(false);
	const [categoryToUpdate, setCategoryToUpdate] = useState<
		undefined | ICategory
	>(undefined);

	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
		useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<
		undefined | ICategory
	>(undefined);

	// handle new modal

	const openNewCategoryModal = () => {
		setIsNewCategoryModalOpen(true);
	};
	const onNewCategorySubmit = async (newCategory: ICategoryNew) => {
		const response = await categoriesService.createCategory(newCategory);
		if (response.success && response.data) {
			dispatch(createCategory(response.data.category));
			setIsNewCategoryModalOpen(false);
		} else {
			showToastsUtil.error(
				response?.message || 'Error creating category'
			);
		}
	};
	const closeNewCategoryModal = () => {
		setIsNewCategoryModalOpen(false);
	};

	// handle update modal

	const openUpdateCategoryModal = (category: ICategory) => {
		setCategoryToUpdate(category);
		setIsUpdateCategoryModalOpen(true);
	};
	const onUpdateCategorySubmit = async (updatedCategory: ICategoryUpdate) => {
		const response = await categoriesService.createCategory(
			updatedCategory
		);
		if (response.success && response.data) {
			dispatch(
				updateCategory({
					categoryId: response.data.category.category_id,
					category: response.data.category,
				})
			);
			setIsUpdateCategoryModalOpen(false);
		} else {
			showToastsUtil.error(
				response?.message || 'Error updating category'
			);
		}
	};
	const closeUpdateCategoryModal = () => {
		setCategoryToUpdate(undefined);
		setIsUpdateCategoryModalOpen(false);
	};

	// handle delete modal

	const openDeleteConfirmationModal = (category: ICategory) => {
		setCategoryToDelete(category);
		setIsDeleteConfirmationModalOpen(true);
	};
	const onDeleteConfirm = async () => {
		if (!categoryToDelete) return;

		const response = await categoriesService.deleteCategory(
			categoryToDelete?.category_id
		);
		if (response.success && response.data) {
			dispatch(deleteCategory({ categoryId: response.data.id }));
			setIsDeleteConfirmationModalOpen(false);
			showToastsUtil.success(response?.message || 'Category deleted');
		} else {
			showToastsUtil.error(
				response?.message || 'Error updating category'
			);
		}
	};
	const closeDeleteConfirmationModal = () => {
		setCategoryToDelete(undefined);
		setIsDeleteConfirmationModalOpen(false);
	};

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
		<>
			<ThemedPage pageTitle="Categories" style={styles.container}>
				<View style={[styles.innerContainer, styles.horizontalPadded]}>
					<ThemedButton
						size="small"
						variant="primary2"
						label="Add a New Category"
						onPress={openNewCategoryModal}
					/>

					<FlatList
						data={categories}
						renderItem={({ item }) => (
							<ListCategoryItem
								category={item}
								onEditClick={() => {
									openUpdateCategoryModal(item);
								}}
								onDeleteClick={() => {
									openDeleteConfirmationModal(item);
								}}
							/>
						)}
						keyExtractor={(item) => item.category_id.toString()}
						ItemSeparatorComponent={() => (
							<Divider
								spacing={15}
								style={{
									marginHorizontal: 5,
									backgroundColor: 'rgba(217, 217, 217, 0.3)',
								}}
							/>
						)}
						ListEmptyComponent={
							<ThemedText
								style={{
									fontStyle: 'italic',
									textAlign: 'center',
								}}
							>
								No categories added
							</ThemedText>
						}
					/>
				</View>
			</ThemedPage>

			<CategoryFormModal
				isVisible={isNewCategoryModalOpen}
				onClose={closeNewCategoryModal}
				onSubmit={onNewCategorySubmit}
				mode="new"
			/>

			<CategoryFormModal
				isVisible={isUpdateCategoryModalOpen}
				onClose={closeUpdateCategoryModal}
				onSubmit={onUpdateCategorySubmit}
				mode="edit"
				formValues={categoryToUpdate}
			/>

			<ConfirmationModal
				isVisible={isDeleteConfirmationModalOpen}
				onClose={closeDeleteConfirmationModal}
				title="Delete"
				description={`Are you sure you want to delete the "${
					categoryToDelete ? categoryToDelete.name : ''
				}" category?`}
				onConfirm={onDeleteConfirm}
				onCancel={closeDeleteConfirmationModal}
				confirmBtnText="Delete"
				confirmBtnVariant="danger"
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
	},

	innerContainer: {
		paddingTop: 20,
		paddingHorizontal: PAGE_PADDING,
		gap: 25,
	},

	horizontalPadded: {
		paddingHorizontal: PAGE_PADDING,
	},
});

export default CategoriesScreen;
