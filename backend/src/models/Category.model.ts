export interface CategoryModel {
	category_id: number;
	name: string;
	icon: string;
	user_id: number; // from user model
	created_at: string;
	updated_at?: string;
}
