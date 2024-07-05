import { ICategory } from '@/types/ICategory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
	categories: ICategory[];
}

const initialState: CategoriesState = {
	categories: [],
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		loadCategories: (state, action: PayloadAction<ICategory[]>) => {
			state.categories = action.payload;
		},
		createCategory: (state, action: PayloadAction<ICategory>) => {
			state.categories = [...state.categories, action.payload];
		},
		updateCategory: (
			state,
			action: PayloadAction<{ categoryId: number; category: ICategory }>
		) => {
			state.categories = state.categories.map((category) =>
				category.category_id === action.payload.categoryId
					? action.payload.category
					: category
			);
		},
		deleteCategory: (
			state,
			action: PayloadAction<{ categoryId: number }>
		) => {
			state.categories = state.categories.filter(
				(category) => category.category_id !== action.payload.categoryId
			);
		},
	},
});

export const {
	loadCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
