import { ICategory } from './ICategory';

export interface IJournalEntryNew {
	title: string;
	content: string;
	category_id?: number;
}

export type IJournalEntryUpdate = IJournalEntryNew;

export interface IJournalEntry extends IJournalEntryNew {
	entry_id: number;
	user_id: number;
	created_at: string;
	updated_at?: string;

	category?: ICategory;
}
