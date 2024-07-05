import { IResponse } from './IResponse';
export interface ICategoryNew {
	name: string;
	icon: string;
}

export type ICategoryUpdate = ICategoryNew;

export interface ICategory extends ICategoryNew {
	category_id: number;
	created_at: string;
	updated_at?: string;
	user_id: number;
}

// Types for the api responses

export type IGetCategoriesResponse = IResponse<{ categories: ICategory[] }>;
export type IGetCategoryResponse = IResponse<{ category: ICategory }>;
export type ICreateCategoryResponse = IResponse<{ category: ICategory }>;
export type IUpdateCategoryResponse = IResponse<{ category: ICategory }>;
export type IDeleteCategoryResponse = IResponse<{ id: number }>;
