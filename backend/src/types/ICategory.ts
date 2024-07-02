export interface ICategoryNew {
	name: string;
	icon: string;
}

export type ICategoryUpdate = ICategoryNew;

export interface ICategory extends ICategoryNew {
	category_id: number;
	created_at: string;
	updated_at?: string;
	created_by: number;
}
