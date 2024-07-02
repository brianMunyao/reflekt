export interface JournalEntryModel {
	entry_id: number;
	user_id: number; // from user model
	title: string;
	content: string;
	category_id: number; // from category model
	created_at: string;
	updated_at?: string;
}
