export interface CategoryModel {
	category_id: number;
	name: string;
	icon: string;
	created_by: number; // from user model
	created_at: string;
	updated_at?: string;
}
