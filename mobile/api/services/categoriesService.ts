import {
	ICategoryNew,
	ICategoryUpdate,
	ICreateCategoryResponse,
	IDeleteCategoryResponse,
	IGetCategoriesResponse,
	IGetCategoryResponse,
	IUpdateCategoryResponse,
} from '@/types/ICategory';
import axiosClient from '../configs/axiosConfig';

const getAllCategories = async () => {
	try {
		const response = await axiosClient.get<IGetCategoriesResponse>(
			'/categories/'
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const getSingleCategory = async (categoryId: number) => {
	try {
		const response = await axiosClient.get<IGetCategoryResponse>(
			`/categories/${categoryId}`
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const createCategory = async (newCategory: ICategoryNew) => {
	try {
		const response = await axiosClient.post<ICreateCategoryResponse>(
			`/categories/`,
			newCategory
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const updateCategory = async (updatedCategory: ICategoryUpdate) => {
	try {
		const response = await axiosClient.put<IUpdateCategoryResponse>(
			`/categories/`,
			updatedCategory
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const deleteCategory = async (categoryId: number) => {
	try {
		const response = await axiosClient.delete<IDeleteCategoryResponse>(
			`/categories/${categoryId}`
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const categoriesService = {
	getAllCategories,
	getSingleCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default categoriesService;
